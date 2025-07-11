/* eslint-disable import/no-cycle, no-alert */
import {
  decorateIcons, loadCSS, createOptimizedPicture, fetchPlaceholders, toCamelCase,
} from '../../scripts/aem.js';
// eslint-disable-next-line import/no-cycle
import {
  formatDateUTCSeconds, isGatedResource, itemSearchTitle, summariseDescription, moveInstrumentation,
} from '../../scripts/scripts.js';
import {
  a, div, h3, p, i, span,
} from '../../scripts/dom-helpers.js';
//import { createCompareBannerInterface } from '../../templates/compare-items/compare-banner.js';
/*import {
  MAX_COMPARE_ITEMS,
  getTitleFromNode,
  getSelectedItems,
  updateCompareButtons,
} from '../../scripts/compare-helpers.js';

let placeholders = {};

/*export async function handleCompareProducts(e) {
  const { target } = e;
  const clickedItemTitle = getTitleFromNode(target);
  const selectedItemTitles = getSelectedItems();

  // get or create compare banner
  //const compareBannerInterface = await createCompareBannerInterface({
   // currentCompareItemsCount: selectedItemTitles.length,
  //});

  //compareBannerInterface.getOrRenderBanner();

  if (selectedItemTitles.includes(clickedItemTitle)) {
    const deleteIndex = selectedItemTitles.indexOf(clickedItemTitle);
    if (deleteIndex !== -1) {
      selectedItemTitles.splice(deleteIndex, 1);
    }
  } else if (selectedItemTitles.length >= MAX_COMPARE_ITEMS) {
    alert(`You can only select up to ${MAX_COMPARE_ITEMS} products.`);
    return;
  } else {
    selectedItemTitles.push(clickedItemTitle);
  }

  updateCompareButtons(selectedItemTitles);
  //compareBannerInterface.refreshBanner();
}*/

class Card {
  constructor(config = {}) {
    this.cssFiles = [];
    this.defaultStyling = true;
    this.defaultImage = '/images/default-card-thumbnail.webp';
    this.defaultButtonText = 'Read More';
    this.useDefaultButtonText = false;
    this.showImageThumbnail = true;
    this.imageBlockReady = false;
    this.thumbnailLink = true;
    this.titleLink = true;
    this.c2aLinkStyle = false;
    this.c2aLinkConfig = false;
    this.c2aLinkIconFull = false;
    this.showDate = false;
    this.showCategory = false;
    this.hideDescription = false;
    this.isRequestQuoteCard = false;
    this.isShopifyCard = false;
    this.showFullDescription = false;

    // Apply overwrites
    Object.assign(this, config);

    if (this.defaultStyling) {
      this.cssFiles.push('/blocks/card/card.css');
    }

    if (this.isShopifyCard) {
      this.defaultButtonText = 'Order';
    }

    if (this.isRequestQuoteCard) {
      this.defaultButtonText = 'Request Quote';
    }

    if (!this.showFullDescription) {
      this.descriptionLength = 75;
    }
  }

  renderItem(item) {
    const cardTitle = itemSearchTitle(item);

    let itemImage = this.defaultImage;
    if (item.thumbnail && item.thumbnail !== '0') {
      itemImage = item.thumbnail;
    } else if (item.image && item.image !== '0') {
      itemImage = item.image;
    }
    const thumbnailBlock = this.imageBlockReady
      ? item.imageBlock : createOptimizedPicture(itemImage, item.title, 'lazy', [{ width: '800' }]);

    /* default button */
    let cardLink = item.path;

    if (isGatedResource(item)) {
      cardLink = item.gatedURL;
    } else if (this.isShopifyCard && item.shopifyUrl) {
      cardLink = item.shopifyUrl;
    } else if (item.redirectPath && item.redirectPath !== '0') {
      cardLink = item.redirectPath;
    }

    const buttonText = !this.useDefaultButtonText && item.cardC2A && item.cardC2A !== '0'
      ? item.cardC2A : this.defaultButtonText;
    let c2aLinkBlock = a({ href: cardLink, 'aria-label': buttonText, class: 'button primary' }, buttonText);
    if (this.c2aLinkConfig) {
      c2aLinkBlock = a(this.c2aLinkConfig, buttonText);
    }
    if (item.c2aLinkConfig) {
      c2aLinkBlock = a(item.c2aLinkConfig, buttonText);
    }
    if (this.c2aLinkStyle) {
      c2aLinkBlock.classList.remove('button', 'primary');
      c2aLinkBlock.append(
        this.c2aLinkIconFull
          ? i({ class: 'fa fa-chevron-circle-right', 'aria-hidden': true })
          : span({ class: 'icon icon-chevron-right-outline', 'aria-hidden': true }),
      );
      decorateIcons(c2aLinkBlock);
    }

    const c2aBlock = div({ class: 'c2a' },
      p({ class: 'button-container' },
        c2aLinkBlock,
      ),
    );

    if (item.specifications && item.specifications !== '0') {
      c2aBlock.append(div({ class: 'compare-button' },
        `${placeholders.compare || 'Compare'} (`,
        span({ class: 'compare-count' }, '0'),
        ')',
        span({
          class: 'compare-checkbox',
          //onclick: handleCompareProducts,
          'data-identifier': item.identifier,
          'data-title': cardTitle,
          'data-path': cardLink,
          'data-thumbnail': itemImage,
          'data-specifications': item.specifications,
          'data-familyID': item.familyID,
        }),
      ));
    }

    /* hide description */
    let cardDescription = '';
    if ((this.isRequestQuoteCard || this.isShopifyCard) && item.cardDescription) {
      cardDescription = item.cardDescription;
    } else if (item.cardDescription && item.cardDescription !== '0' && !this.hideDescription) {
      cardDescription = summariseDescription(item.cardDescription, this.descriptionLength);
    } else if (item.description && item.description !== '0' && !this.hideDescription) {
      cardDescription = summariseDescription(item.description, this.descriptionLength);
    }

    return (
      div({ class: 'card' },
        this.showImageThumbnail ? div({ class: 'card-thumb' },
          this.thumbnailLink ? a({ href: cardLink },
            thumbnailBlock,
          ) : thumbnailBlock,
        ) : '',
        item.badgeText ? div({ class: 'badge' }, item.badgeText) : '',
        this.showCategory ? span({ class: 'card-category' }, item.subCategory && item.subCategory !== '0' ? item.subCategory : item.category) : '',
        div({ class: 'card-caption' },
          item.displayType ? div({ class: 'card-type' }, item.displayType) : '',
          this.showDate ? div({ class: 'card-date' }, formatDateUTCSeconds(item.date)) : '',
          h3(
            this.titleLink ? a({ href: cardLink }, cardTitle) : cardTitle,
          ),
          cardDescription ? p({ class: 'card-description' }, cardDescription) : '',
          c2aBlock,
        ),
      )
    );
  }

  async loadCSSFiles() {
    let defaultCSSPromise = Promise.resolve();
    if (Array.isArray(this.cssFiles) && this.cssFiles.length > 0) {
      defaultCSSPromise = Promise.all(this.cssFiles.map(loadCSS));
    }
    return defaultCSSPromise;
  }
}

/**
 * Render card item from Universal Editor data
 * @param {Object} data - Card data from Universal Editor
 * @param {HTMLElement} originalElement - Original DOM element for instrumentation
 * @returns {HTMLElement} - Rendered card element
 */
function renderCardFromData(data, originalElement) {
  const cardElement = div({ class: 'card' });

  // Create image element if image is provided
  if (data.image) {
    const imageElement = div({ class: 'card-thumb' });
    const picture = createOptimizedPicture(data.image, data.title || '', 'lazy', [{ width: '800' }]);
    
    if (data.link) {
      const linkElement = a({ href: data.link }, picture);
      imageElement.appendChild(linkElement);
    } else {
      imageElement.appendChild(picture);
    }
    
    cardElement.appendChild(imageElement);
    
    // Apply instrumentation to image
    const originalImage = originalElement.querySelector('picture');
    if (originalImage) {
      moveInstrumentation(originalImage, picture);
    }
  }

  // Create category badge if provided
  if (data.category && data.showCategory) {
    const categoryElement = span({ class: 'card-category' }, data.category);
    cardElement.appendChild(categoryElement);
  }

  // Create badge if provided
  if (data.badgeText) {
    const badgeElement = div({ class: 'badge' }, data.badgeText);
    cardElement.appendChild(badgeElement);
  }

  // Create card caption
  const captionElement = div({ class: 'card-caption' });

  // Add date if showDate is true
  if (data.showDate && data.date) {
    const dateElement = div({ class: 'card-date' }, formatDateUTCSeconds(data.date));
    captionElement.appendChild(dateElement);
  }

  // Create title
  if (data.title) {
    const titleElement = h3();
    if (data.link) {
      const titleLink = a({ href: data.link }, data.title);
      titleElement.appendChild(titleLink);
    } else {
      titleElement.textContent = data.title;
    }
    captionElement.appendChild(titleElement);
    
    // Apply instrumentation to title
    const originalTitle = originalElement.querySelector('h3');
    if (originalTitle) {
      moveInstrumentation(originalTitle, titleElement);
    }
  }

  // Create description
  if (data.description) {
    const descriptionElement = p({ class: 'card-description' }, data.description);
    captionElement.appendChild(descriptionElement);
    
    // Apply instrumentation to description
    const originalDescription = originalElement.querySelector('p');
    if (originalDescription) {
      moveInstrumentation(originalDescription, descriptionElement);
    }
  }

  // Create CTA button
  if (data.link && data.buttonText) {
    const c2aBlock = div({ class: 'c2a' },
      p({ class: 'button-container' },
        a({ href: data.link, 'aria-label': data.buttonText, class: 'button primary' }, data.buttonText)
      )
    );
    captionElement.appendChild(c2aBlock);
    
    // Apply instrumentation to CTA
    const originalCTA = originalElement.querySelector('.button-container');
    if (originalCTA) {
      moveInstrumentation(originalCTA, c2aBlock.querySelector('.button-container'));
    }
  }

  cardElement.appendChild(captionElement);
  return cardElement;
}

/**
 * Create and render default card.
 * @param {Object}  item     required - rendered item in JSON
 * @param {Object}  config   optional - config object for
 * customizing the rendering and behaviour
 */
export async function createCard(config = {}) {
  placeholders = await fetchPlaceholders();

  config.defaultButtonText = config.defaultButtonText
    ? (placeholders[toCamelCase(config.defaultButtonText)] || config.defaultButtonText)
    : placeholders.readMore;
  const card = new Card(config);
  await card.loadCSSFiles();
  return card;
}

/**
 * Decorate card block for Universal Editor support
 * @param {HTMLElement} block - The card block element
 */
export default async function decorate(block) {
  // Try to get component model for Universal Editor
  let componentModel;
  try {
    const response = await fetch('/component-models.json');
    if (response.ok) {
      const models = await response.json();
      componentModel = models.card;
    }
  } catch (error) {
    console.log('Component models not available, using DOM-based approach');
  }

  if (componentModel && componentModel.data) {
    // Universal Editor approach
    const originalElement = block.cloneNode(true);
    block.innerHTML = '';
    
    const cardElement = renderCardFromData(componentModel.data, originalElement);
    block.appendChild(cardElement);
  } else {
    // Fallback to existing DOM-based approach
    // This maintains compatibility with existing implementations
    const rows = [...block.children];
    
    rows.forEach((row) => {
      const cells = [...row.children];
      if (cells.length >= 2) {
        const imageCell = cells[0];
        const contentCell = cells[1];
        
        // Create card structure from DOM
        const cardElement = div({ class: 'card' });
        
        // Handle image
        const img = imageCell.querySelector('img');
        if (img) {
          const imageElement = div({ class: 'card-thumb' });
          const picture = createOptimizedPicture(img.src, img.alt, 'lazy', [{ width: '800' }]);
          imageElement.appendChild(picture);
          cardElement.appendChild(imageElement);
        }
        
        // Handle content
        const captionElement = div({ class: 'card-caption' });
        
        // Extract title, description, and CTA from content cell
        const title = contentCell.querySelector('h1, h2, h3, h4, h5, h6');
        if (title) {
          const titleElement = h3();
          titleElement.innerHTML = title.innerHTML;
          captionElement.appendChild(titleElement);
        }
        
        const paragraphs = contentCell.querySelectorAll('p');
        paragraphs.forEach((p) => {
          if (!p.querySelector('a.button')) {
            const descElement = p.cloneNode(true);
            descElement.className = 'card-description';
            captionElement.appendChild(descElement);
          } else {
            // This is a CTA paragraph
            const c2aBlock = div({ class: 'c2a' },
              p({ class: 'button-container' }, ...p.childNodes)
            );
            captionElement.appendChild(c2aBlock);
          }
        });
        
        cardElement.appendChild(captionElement);
        row.replaceWith(cardElement);
      }
    });
  }
}