import { markRaw, ref, shallowRef, type Component } from "vue";

interface DialogOptions {
  component: Component;
  metadata?: any;
  fullscreen: boolean;
  width?: string | number;
  persistent?: boolean;
  vDialogCss: string[];
  onClose?: (result?: any) => void;
}

class DialogService {
  private static instance: DialogService;
  private _dialog = ref(false);
  private _component = shallowRef<Component | null>(null);
  private _metadata = ref<any>(null);
  private _width = ref("500px");
  private _persistent = ref(false);
  private _fullscreen = ref(false);
  private _vDialogCss = ref<string[]>([]);
  private _onClose?: (result?: any) => void;

  //private constructor() {}

  public static getInstance(): DialogService {
    if (!DialogService.instance) {
      DialogService.instance = new DialogService();
    }
    return DialogService.instance;
  }

  get isOpen() {
    return this._dialog;
  }
  get component() {
    return this._component;
  }
  get metadata() {
    return this._metadata;
  }
  get width() {
    return this._width;
  }
  get persistent() {
    return this._persistent;
  }

  get fullscreen() {
    return this._fullscreen;
  }

  get vDialogCss() {
    return this._vDialogCss;
  }

  open(options: DialogOptions) {
    this._component.value = markRaw(options.component);
    this._metadata.value = options.metadata;
    this._width.value = options.width?.toString() || "500px";
    this._persistent.value = options.persistent || false;
    this._onClose = options.onClose;
    this._fullscreen.value = options.fullscreen;
    this._vDialogCss.value = options.vDialogCss || [];
    this._dialog.value = true;
  }

  close(result?: any) {
    this._dialog.value = false;
    this._onClose?.(result);
    setTimeout(() => {
      this._component.value = null;
      this._metadata.value = null;
      this._onClose = undefined;
    }, 300);
  }
}

export const dialogService = DialogService.getInstance();
