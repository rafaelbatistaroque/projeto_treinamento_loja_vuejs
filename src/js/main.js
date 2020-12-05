const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
  },
  methods: {
    async obterProdutos() {
      let promise = await fetch("./api/produtos.json");
      this.produtos = await promise.json();
    },
    async obterProduto(id) {
      let promise = await fetch(`./api/produtos/${id}/dados.json`);
      this.produto = await promise.json();
    }
  },
  created() {
    this.obterProdutos();
  }
});