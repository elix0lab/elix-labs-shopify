if (!customElements.get('elix-product')) {
  class ElixProduct extends HTMLElement {}
  customElements.define('elix-product', ElixProduct)
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.elix-product').forEach((root) => {
    const mediaItems = root.querySelectorAll('.elix-gallery__media');
    root.querySelectorAll('[data-media-target]').forEach((thumb) => thumb.addEventListener('click', () => {
      mediaItems.forEach((item) => { item.classList.toggle('is-active', item.dataset.mediaId === thumb.dataset.mediaTarget); item.hidden = item.dataset.mediaId !== thumb.dataset.mediaTarget; });
      root.querySelectorAll('[data-media-target]').forEach((item) => { const active = item === thumb; item.classList.toggle('is-active', active); item.setAttribute('aria-selected', active); });
    }));

    const form = root.querySelector('.elix-form');
    const variants = JSON.parse(root.querySelector('[data-elix-variants]')?.textContent || '[]');
    root.querySelectorAll('.elix-option').forEach((option) => option.addEventListener('click', () => {
      const fieldset = option.closest('fieldset');
      fieldset.querySelectorAll('.elix-option').forEach((item) => { const active = item === option; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', active); });
      const selected = [...root.querySelectorAll('.elix-options')].map((group) => group.querySelector('.elix-option.is-active')?.dataset.optionValue);
      const variant = variants.find((item) => item.options.every((value, index) => value === selected[index]));
      if (!variant) return;
      form.querySelector('[data-variant-id]').value = variant.id;
      const price = root.querySelector('[data-elix-price]');
      price.textContent = new Intl.NumberFormat(document.documentElement.lang || 'en', { style: 'currency', currency: window.Shopify?.currency?.active || 'USD' }).format(variant.price / 100);
      const add = form.querySelector('[name="add"]'); add.disabled = !variant.available;
      if (variant.featured_media) root.querySelector(`[data-media-target="${variant.featured_media.id}"]`)?.click();
      history.replaceState({}, '', `${location.pathname}?variant=${variant.id}`);
    }));
    const quantity = form?.querySelector('[name="quantity"]');
    form?.querySelector('[data-qty-minus]')?.addEventListener('click', () => { quantity.value = Math.max(1, Number(quantity.value) - 1); });
    form?.querySelector('[data-qty-plus]')?.addEventListener('click', () => { quantity.value = Number(quantity.value) + 1; });
    form?.addEventListener('submit', async (event) => {
      event.preventDefault(); const button = form.querySelector('[name="add"]'); const message = form.querySelector('.elix-form-message'); button.setAttribute('aria-busy', 'true');
      try { const response = await fetch(`${window.Shopify?.routes?.root || '/'}cart/add.js`, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) }); const result = await response.json(); if (!response.ok) throw new Error(result.description); message.textContent = root.dataset.addedMessage || 'Added to cart'; document.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true })); }
      catch (error) { message.textContent = error.message || 'Unable to add this item.'; } finally { button.removeAttribute('aria-busy'); }
    });
  });
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
  document.querySelectorAll('.elix-reveal').forEach((item) => observer.observe(item));
});
