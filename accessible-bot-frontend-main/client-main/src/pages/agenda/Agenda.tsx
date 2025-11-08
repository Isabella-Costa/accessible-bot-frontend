import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Agenda.css";
import SharedTopBar from "../../components/topbar/SharedTopBar";

interface Lembrete {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  horaInicio?: string;
  horaFim?: string;
}

const API_URL = "http://localhost:5000/api/lembretes";

const Agenda = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);

  // 🔹 Carrega lembretes do backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setLembretes(data))
      .catch((err) => console.error("Erro ao carregar lembretes:", err));
  }, []);

  const handleAdicionarLembrete = async () => {
    if (!titulo || !data) return;

    const novoLembrete = { titulo, descricao, data, horaInicio, horaFim };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoLembrete),
      });
      const salvo = await res.json();
      setLembretes([salvo, ...lembretes]);
      setTitulo('');
      setDescricao('');
      setData('');
      setHoraInicio('');
      setHoraFim('');
    } catch (err) {
      console.error("Erro ao adicionar lembrete:", err);
    }
  };

  const handleRemoverLembrete = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setLembretes(lembretes.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Erro ao remover lembrete:", err);
    }
  };

  return (
    <div className="agenda-page-container">
      <SharedTopBar pageType="agenda" />

      <div className="agenda-content-area">
        <div className="main-agenda">
          <div className="agenda-left">
            <h1>Agenda Virtual</h1>
            <div className="agenda-card">
              <h2>Novo Lembrete</h2>

              <div className="agenda-textfield">
                <label>Título *</label>
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Digite o título" />
              </div>

              <div className="agenda-textfield">
                <label>Descrição</label>
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Digite detalhes (opcional)" />
              </div>

              <div className="agenda-textfield">
                <label>Data *</label>
                <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
              </div>

              <div className="agenda-time-fields">
                <div className="agenda-textfield half">
                  <label>Hora inicial</label>
                  <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
                </div>
                <div className="agenda-textfield half">
                  <label>Hora final</label>
                  <input type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} />
                </div>
              </div>

              <button className="agenda-button" onClick={handleAdicionarLembrete}>Adicionar</button>
            </div>
          </div>

          <div className="agenda-right">
            <h1>Meus Lembretes</h1>
            <div className="agenda-list">
              {lembretes.length === 0 && <p>Não há lembretes cadastrados.</p>}
              {lembretes.map((lembrete) => (
                <div className="lembrete-card" key={lembrete.id}>
                  <h3>{lembrete.titulo}</h3>
                  <span>Data: {lembrete.data}</span>
                  {lembrete.horaInicio && (
                    <span>
                      Horário: {lembrete.horaInicio} - {lembrete.horaFim}
                    </span>
                  )}
                  {lembrete.descricao && <p>{lembrete.descricao}</p>}
                  <button className="remover-btn" onClick={() => handleRemoverLembrete(lembrete.id)}>Remover</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
