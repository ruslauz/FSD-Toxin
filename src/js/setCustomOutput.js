export default function setCustomOutput(selector) {
  if (this.$el) this.$output = this.$el.closest('.dropdown').querySelectorAll(selector)
  this.dateOutput();
}
