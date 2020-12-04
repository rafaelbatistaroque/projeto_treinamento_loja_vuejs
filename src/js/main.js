const vm = new Vue({
  el: "#app",
  data: {
    produtos: []
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
    }
  },
  created() {
    this.obterProdutos();
  }
});