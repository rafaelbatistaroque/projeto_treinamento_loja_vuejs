const vm = new Vue({
  el: "#app",
  data: {
    produtos: []
  },
  methods: {
    async obterProdutos() {
      let promise = await fetch("./api/produtos.json");
      this.produtos = await promise.json();
    }
  },
  created() {
    this.obterProdutos();
  }
});