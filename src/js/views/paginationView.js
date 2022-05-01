import View from './View';
import icons from 'url:../../img/icons.svg'; //

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupButton(direction) {
    return `<button data-goto="${
      direction === 'right' ? this._data.page + 1 : this._data.page - 1
    }" class="btn--inline pagination__btn--${
      direction === 'right' ? 'next' : 'prev'
    }"> <span>${
      direction === 'right' ? this._data.page + 1 : this._data.page - 1
    }</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      direction === 'right' ? 'right' : 'left'
    }"></use>  
            </svg>
          </button>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `${this._generateMarkupButton('right')}`;
    }
    // last page
    if (curPage === numPages && numPages > 1) {
      return `${this._generateMarkupButton('left')}`;
    }

    // Other page
    if (curPage < numPages) {
      return `${this._generateMarkupButton(
        'right'
      )}${this._generateMarkupButton('left')}`;
    }
    // page 1, and there are No other pages
    return '';
  }
}

export default new PaginationView();
