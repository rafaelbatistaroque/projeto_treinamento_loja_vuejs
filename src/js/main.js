const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
  },
  computed: {
    textoBotalModal() {
      return this.produto.estoque === 0 && "Item Esgotado" || "Adicionar Item";
    },
    statusBotaoModal() {
      return this.produto.estoque === 0;
    },
    carrinhoTotalItens() {
      return this.carrinho.length;
    },
    carrinhoValorTotal() {
      return this.carrinho.reduce((acc, item) => acc + item.preco, 0);
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
    },
    abrirModal(id) {
      this.obterProduto(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    fecharModal({ currentTarget, target }) {
      if (target === currentTarget)
        this.produto = false;
    },
    adicionarItemNoCarrinho() {
      this.debitarDoEstoque();
      const { id, nome, preco } = this.produto;
      this.carrinho.push({ id, nome, preco });
    },
    removerItemDoCarrinho(index) {
      this.carrinho.splice(index, 1);
    },
    debitarDoEstoque() {
      this.produto.estoque--;
    },
    checarLocalStorage() {
      if (window.localStorage.carrinho)
        this.carrinho = JSON.parse(window.localStorage.carrinho);
    }
  },
  watch: {
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    }
  },
  created() {
    this.obterProdutos();
    this.checarLocalStorage();
  }
});