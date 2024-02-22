export default () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="font-semibold text-2xl text-center my-4">Meu carrinho</h1>

      <section className="flex items-center justify-between border-b-2 border-gray-300">
        <img
          className="w-28"
          src="https://leonora.vteximg.com.br/arquivos/ids/161800/fone-de-ouvido-letron-earbud-bluetooth-preto_2.jpg?v=637729357675970000"
          alt="Logo Produto"
        />

        <strong>Preõ: R$ 1.000</strong>

        <div className="flex items-center justify-center gap-3">
          <button className="bg-slate-600 px-2 rounded text-white font-semibold items-center justify-center"
          >
            -
          </button>
          2
          <button className="bg-slate-600 px-2 rounded text-white font-semibold items-center justify-center"
          >
            +
          </button>
        </div>

        <strong className="float-right">
          SubTotal: R$1000
        </strong>
      </section>

      <p className="font-bold mt-4">Total: R$ 1000</p>
    </div>
  )
}