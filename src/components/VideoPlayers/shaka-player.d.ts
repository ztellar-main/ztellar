declare module "shaka-player/dist/shaka-player.ui" {
  export = shaka;
}

declare namespace shaka {
  class Player {
    constructor(video: HTMLVideoElement);
    load(src: string): Promise<void>;
    destroy(): Promise<void>;
    addEventListener(type: string, listener: (event: Event) => void): void;
  }

  namespace ui {
    class Overlay {
      configure: any;
      constructor(
        player: shaka.Player,
        container: HTMLElement,
        video: HTMLVideoElement
      );
      getControls(): Controls;
      destroy(): void;
    }

    class Controls {
      addEventListener(type: string, listener: (event: Event) => void): void;
    }
  }

  namespace util {
    class Error {
      code: number;
      severity: number;
      category: number;
      data: any[];
      constructor(
        code: number,
        severity: number,
        category: number,
        data: any[]
      );
    }
  }
}
