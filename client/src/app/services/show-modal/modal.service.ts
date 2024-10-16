import {
  ApplicationRef,
  ComponentRef,
  Injectable,
  Injector,
  Type,
  createComponent,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef: ComponentRef<any> | null = null;

  constructor(private injector: Injector, private appRef: ApplicationRef) {}

  // Метод для открытия любого компонента
  openModal<T>(component: Type<T>, componentInputs?: Partial<T>) {
    if (this.modalRef) {
      return;
    }

    // Создаем компонент
    this.modalRef = createComponent(component, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector,
    });

    // Передаем входные параметры в компонент (если есть)
    if (componentInputs) {
      Object.assign(this.modalRef.instance, componentInputs);
    }

    // Добавляем компонент в дерево Angular
    this.appRef.attachView(this.modalRef.hostView);

    // Получаем элемент компонента и добавляем его в body
    const domElem = this.modalRef.location.nativeElement;
    document.body.appendChild(domElem);

    // Фокусируемся на элементе диалога (если используется <dialog>)
    const dialogElem = domElem.querySelector('dialog') as HTMLDialogElement;
    if (dialogElem) {
      dialogElem.showModal();
      dialogElem.focus();
      dialogElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  closeModal() {
    if (this.modalRef) {
      const dialogElem = this.modalRef.location.nativeElement.querySelector(
        'dialog'
      ) as HTMLDialogElement;
      if (dialogElem) {
        dialogElem.close();
      }

      document.body.removeChild(this.modalRef.location.nativeElement);

      // Удаляем компонент из дерева Angular
      this.appRef.detachView(this.modalRef.hostView);

      // Уничтожаем ссылку на компонент
      this.modalRef.destroy();
      this.modalRef = null;
    }
  }
}
