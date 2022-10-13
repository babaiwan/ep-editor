import Picker from './picker';

class IconPicker extends Picker {
  constructor(select, icons) {
    super(select);
    this.container.classList.add('ql-icon-picker');
    Array.from(this.container.querySelectorAll('.ql-picker-item')).forEach(
      item => {
        if (icons[item.getAttribute('data-value')].startsWith('data:image/svg+xml;base64,')){
          item.innerHTML = `<img src=${icons[item.getAttribute('data-value')]}
            style="background-image: url("${icons[item.getAttribute('data-value')]}")">`
        }else{
          item.innerHTML = icons[item.getAttribute('data-value') || ''];
        }
      },
    );
    this.defaultItem = this.container.querySelector('.ql-selected');
    this.selectItem(this.defaultItem);
  }

  selectItem(target, trigger) {
    super.selectItem(target, trigger);
    const item = target || this.defaultItem;
    if (this.label.innerHTML === item.innerHTML) return;
    this.label.innerHTML = item.innerHTML;
  }
}

export default IconPicker;
