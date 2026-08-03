class ElixRewards extends HTMLElement {
  connectedCallback() {
    this.copyButton = this.querySelector('[data-elix-copy]');
    this.form = this.querySelector('[data-elix-ambassador-form]');
    this.copyButton?.addEventListener('click', () => this.copyCode());
    this.form?.addEventListener('submit', (event) => this.openApplication(event));
  }

  async copyCode() {
    const status = this.querySelector('[data-elix-copy-status]');
    try {
      await navigator.clipboard.writeText(this.copyButton.dataset.elixCopy);
      status.textContent = this.copyButton.dataset.successMessage;
    } catch (_error) {
      status.textContent = this.copyButton.dataset.errorMessage;
    }
    window.setTimeout(() => { status.textContent = ''; }, 3000);
  }

  openApplication(event) {
    event.preventDefault();
    const email = this.form.elements.email.value.trim();
    const body = this.form.dataset.emailBody.replace('[EMAIL]', email || '—');
    window.location.href = `mailto:${this.form.dataset.recipient}?subject=${encodeURIComponent(this.form.dataset.subject)}&body=${encodeURIComponent(body)}`;
  }
}

if (!customElements.get('elix-rewards')) customElements.define('elix-rewards', ElixRewards);
