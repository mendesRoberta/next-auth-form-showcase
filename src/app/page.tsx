import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  // Ação de envio do formulário executada no servidor
  async function handleFormSubmit(formData: FormData) {
    "use server";
    const currentSession = await auth();
    if (!currentSession?.user) {
      throw new Error("Não autorizado.");
    }

    const payload = {
      userEmail: currentSession.user.email,
      userName: currentSession.user.name,
      titulo: formData.get("titulo"),
      descricao: formData.get("descricao"),
    };

    console.log("Dados recebidos com sessão autenticada:", payload);
    // Aqui, salvaria no banco de dados ou chamaria outra API
  }

  // 1. ESTADO NÃO AUTENTICADO
  if (!session?.user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-zinc-950 text-white">
        <div className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl text-center space-y-6">
          <h1 className="text-2xl font-bold">Protótipo - Geoportal</h1>
          <p className="text-sm text-zinc-400">
            Para acessar o formulário, você precisa se identificar via GitHub (OAuth 2.0).
          </p>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 px-4 rounded-xl hover:bg-zinc-200 transition"
            >
              Entrar com GitHub
            </button>
          </form>
        </div>
      </main>
    );
  }

  // 2. ESTADO AUTENTICADO (Exibe perfil + Formulário)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-zinc-950 text-white">
      <div className="w-full max-w-lg p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
        {/* Cabeçalho com dados da sessão OAuth */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "Avatar"}
                className="w-11 h-11 rounded-full border border-zinc-700"
              />
            )}
            <div>
              <p className="text-sm font-semibold">{session.user.name}</p>
              <p className="text-xs text-zinc-400">{session.user.email}</p>
            </div>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="text-xs text-red-400 hover:text-red-300 transition underline"
            >
              Sair
            </button>
          </form>
        </div>

        {/* Formulário integrado */}
        <div>
          <h2 className="text-xl font-bold">Formulário de Cadastro / Registro</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Seus dados de identidade foram preenchidos automaticamente via OAuth.
          </p>
        </div>

        <form action={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Nome (obtido do GitHub)
            </label>
            <input
              type="text"
              value={session.user.name ?? ""}
              readOnly
              className="w-full bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-sm rounded-lg p-2.5 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              E-mail (obtido do GitHub)
            </label>
            <input
              type="email"
              value={session.user.email ?? ""}
              readOnly
              className="w-full bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-sm rounded-lg p-2.5 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-200 mb-1">
              Título da Demanda
            </label>
            <input
              type="text"
              name="titulo"
              required
              placeholder="Ex: Mapeamento de área X"
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-200 mb-1">
              Descrição / Observações
            </label>
            <textarea
              name="descricao"
              rows={3}
              required
              placeholder="Detalhes adicionais..."
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg text-sm transition"
          >
            Enviar Formulário
          </button>
        </form>
      </div>
    </main>
  );
};