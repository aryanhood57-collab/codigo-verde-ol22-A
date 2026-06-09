import { useState, useEffect, useRef } from "react";

// ============================================================
// OPERACIÓN: CÓDIGO VERDE — VERSIÓN A
// Técnico Superior en Operaciones Logísticas
// Grupo OL-2-2 | EDA1001 | II Cuatrimestre 2026
// Equipos: ALFA · GAMMA · ÉPSILON
// Contraseña final: CONTENEDOR
// ============================================================

const CONTRASENA = "CONTENEDOR";
const VERSION = "A";
const EQUIPOS_VERSION = "ALFA · GAMMA · ÉPSILON";

const RETOS = [
  // ══════════════════════════════════════════════
  // BLOQUE 1: CALENTAMIENTO — 3 retos × 10 min
  // ══════════════════════════════════════════════
  {
    id: 1,
    bloque: "CALENTAMIENTO",
    bloqueColor: "#1B5E20",
    minutos: 10,
    letra: "C",
    titulo: "La Huella que Deja Mover una Caja",
    contexto: "La empresa LogisPanama S.A. opera un centro de distribución en Colón. Durante un mes, sus montacargas de combustión interna consumieron 800 litros de diésel. El factor de emisión del diésel es 2.68 kg CO₂ por litro.",
    pregunta1: {
      enunciado: "Calcula la huella de carbono mensual generada por los montacargas de LogisPanama S.A. Muestra tu procedimiento.",
      tipo: "abierta",
      respuesta: "800 L × 2.68 kg CO₂/L = 2,144 kg CO₂ = 2.144 toneladas de CO₂ al mes."
    },
    pregunta2: {
      enunciado: "¿Cuál de los siguientes describe mejor un ASPECTO ambiental en operaciones de bodega?",
      opciones: [
        "A) La contaminación del suelo por derrames de aceite",
        "B) El consumo de combustible por los montacargas",
        "C) El aumento de temperatura en zonas de almacenamiento",
        "D) El ruido generado por las bandas transportadoras"
      ],
      correcta: "B",
      explicacion: "El aspecto ambiental es la CAUSA (consumo de combustible). Los demás son efectos o impactos derivados de ese u otros aspectos."
    }
  },
  {
    id: 2,
    bloque: "CALENTAMIENTO",
    bloqueColor: "#1B5E20",
    minutos: 10,
    letra: "O",
    titulo: "Marco Legal: ¿Quién Regula la Logística Verde?",
    contexto: "Panamá cuenta con legislación ambiental que regula las actividades industriales y de servicios, incluyendo el sector logístico. Dos normas clave son la Ley 41 de 1998 y el Decreto Ejecutivo 57 de 2000.",
    pregunta1: {
      enunciado: "Explica qué establece la Ley 41 de 1998 de Panamá y cómo aplica a una empresa de logística y distribución.",
      tipo: "abierta",
      respuesta: "La Ley 41 de 1998 es la Ley General de Ambiente de Panamá. Establece los principios de la política ambiental nacional, crea la Autoridad Nacional del Ambiente (ANAM, hoy MiAMBIENTE), y obliga a toda actividad económica a prevenir, mitigar y compensar los impactos ambientales que genere. Para una empresa logística aplica porque debe gestionar sus emisiones, residuos de embalaje, vertimientos y consumo de recursos conforme a esta ley."
    },
    pregunta2: {
      enunciado: "El Decreto Ejecutivo 57 de 2000 de Panamá regula:",
      opciones: [
        "A) El transporte de mercancías peligrosas por carretera",
        "B) La Evaluación de Impacto Ambiental (EIA) y sus categorías",
        "C) Las normas de emisión de gases para vehículos de carga",
        "D) El manejo de residuos sólidos en zonas portuarias"
      ],
      correcta: "B",
      explicacion: "El Decreto Ejecutivo 57/2000 desarrolla el proceso de EIA en Panamá, estableciendo tres categorías según el nivel de impacto potencial de las actividades (Categoría I, II y III). Una empresa logística grande puede requerir EIA Categoría II o III."
    }
  },
  {
    id: 3,
    bloque: "CALENTAMIENTO",
    bloqueColor: "#1B5E20",
    minutos: 10,
    letra: "N",
    titulo: "Sostenibilidad Tridimensional en la Cadena de Suministro",
    contexto: "Una empresa de logística internacional decide rediseñar su cadena de suministro incorporando criterios de sostenibilidad. El gerente de operaciones propone analizar cada decisión desde tres dimensiones: ambiental, social y económica.",
    pregunta1: {
      enunciado: "Para la decisión de sustituir una flota diésel por vehículos eléctricos, identifica al menos UN beneficio por cada dimensión de la sostenibilidad (ambiental, social y económica).",
      tipo: "abierta",
      respuesta: "Ambiental: reducción de emisiones de CO₂ y contaminantes locales (NOx, PM2.5). Social: mejora de la calidad del aire en comunidades cercanas a rutas de distribución, reducción del ruido. Económica: reducción de costos de combustible a largo plazo, posibles incentivos fiscales verdes, mejora de imagen corporativa y acceso a licitaciones con criterios sostenibles."
    },
    pregunta2: {
      enunciado: "Según los ODS de la ONU, ¿cuál está MÁS directamente relacionado con la reducción de emisiones en el transporte logístico?",
      opciones: [
        "A) ODS 2 — Hambre Cero",
        "B) ODS 9 — Industria, Innovación e Infraestructura",
        "C) ODS 13 — Acción por el Clima",
        "D) ODS 16 — Paz, Justicia e Instituciones Sólidas"
      ],
      correcta: "C",
      explicacion: "El ODS 13 llama a tomar medidas urgentes para combatir el cambio climático. La reducción de emisiones de GEI en el transporte logístico contribuye directamente a este objetivo. El ODS 9 también es relevante (infraestructura sostenible), pero el ODS 13 es el más directo para la reducción de emisiones."
    }
  },

  // ══════════════════════════════════════════════
  // BLOQUE 2: NÚCLEO TÉCNICO — 4 retos × 8 min
  // ══════════════════════════════════════════════
  {
    id: 4,
    bloque: "NÚCLEO TÉCNICO",
    bloqueColor: "#0D47A1",
    minutos: 8,
    letra: "T",
    titulo: "Matriz de Aspectos e Impactos: La Bodega bajo la Lupa",
    contexto: "Están evaluando ambientalmente un centro de distribución que realiza las siguientes actividades: recepción de mercancías, almacenamiento en estantes, carga y descarga con montacargas, embalaje y despacho. Deben aplicar la Matriz de Leopold adaptada al sector logístico.",
    pregunta1: {
      enunciado: "Construye una Matriz de Leopold simplificada para la actividad 'carga y descarga con montacargas'. Identifica al menos 3 aspectos ambientales y su impacto correspondiente, indicando si el impacto es positivo (+) o negativo (−) y su magnitud (baja, media, alta).",
      tipo: "abierta",
      respuesta: "Ejemplo correcto: Aspecto 1: Consumo de combustible diésel → Impacto: Emisiones de CO₂ y NOx al aire → (−) Alta magnitud. Aspecto 2: Ruido de motores y bocinas → Impacto: Contaminación acústica laboral y comunitaria → (−) Media magnitud. Aspecto 3: Posibles derrames de aceite hidráulico → Impacto: Contaminación del suelo y agua superficial → (−) Media-Alta magnitud. Aspecto 4 (si lo mencionan): Generación de residuos de embalaje roto → Impacto: Residuos sólidos → (−) Baja magnitud."
    },
    pregunta2: {
      enunciado: "En la Matriz de Leopold, la MAGNITUD de un impacto se refiere a:",
      opciones: [
        "A) La frecuencia con que ocurre el impacto durante las operaciones",
        "B) La extensión geográfica del área afectada por el impacto",
        "C) La intensidad o severidad del cambio en el componente ambiental afectado",
        "D) El costo económico de remediar el daño causado"
      ],
      correcta: "C",
      explicacion: "En la Matriz de Leopold, la magnitud (eje horizontal) representa qué tan intenso o severo es el cambio en el componente ambiental (escala 1–10). La importancia (eje vertical) representa el peso ecológico del componente afectado. Frecuencia y extensión son otras variables de valoración, pero no son la definición de magnitud en Leopold."
    }
  },
  {
    id: 5,
    bloque: "NÚCLEO TÉCNICO",
    bloqueColor: "#0D47A1",
    minutos: 8,
    letra: "E",
    titulo: "Economía Circular y el Ciclo de Vida del Embalaje",
    contexto: "Una empresa distribuidora panameña utiliza anualmente: 50,000 cajas de cartón corrugado (no recicladas), 8,000 kg de plástico de burbuja y 3,000 kg de flejes de polipropileno. Solo el 15% de estos materiales se recupera actualmente.",
    pregunta1: {
      enunciado: "Propón un Plan de Economía Circular para el manejo de materiales de embalaje de esta empresa. Incluye al menos TRES estrategias concretas, diferenciando entre las opciones de las 5R (Reducir, Reutilizar, Reciclar, Recuperar, Rediseñar).",
      tipo: "abierta",
      respuesta: "Estrategia 1 — Reducir: Implementar embalaje mínimo necesario optimizado (right-sizing) para cada tipo de producto, reduciendo el volumen de cartón hasta en un 20%. Estrategia 2 — Reutilizar: Sistema de cajas retornables para clientes frecuentes con depósito reembolsable, reutilizando cada caja hasta 5 veces. Estrategia 3 — Reciclar: Separación en origen del cartón, plástico y flejes con contenedores diferenciados; convenio con empresa recicladora para retiro periódico (meta: 70% de recuperación). Estrategia adicional válida — Rediseñar: Migrar a embalajes biodegradables o hechos de materiales reciclados post-consumo."
    },
    pregunta2: {
      enunciado: "¿Cuál de estas acciones representa el principio de ECOEFICIENCIA aplicado a operaciones de almacén?",
      opciones: [
        "A) Aumentar el número de turnos laborales para despachar más pedidos",
        "B) Producir más unidades usando menos recursos y generando menos residuos",
        "C) Subcontratar el manejo de residuos a una empresa externa",
        "D) Certificar la empresa bajo ISO 9001 para mejorar la calidad del servicio"
      ],
      correcta: "B",
      explicacion: "La ecoeficiencia (concepto del WBCSD) significa crear más valor con menos impacto ambiental: producir más bienes y servicios usando menos recursos naturales y generando menos residuos. La opción A aumenta producción pero no eficiencia. La C y D son válidas, pero no definen ecoeficiencia."
    }
  },
  {
    id: 6,
    bloque: "NÚCLEO TÉCNICO",
    bloqueColor: "#0D47A1",
    minutos: 8,
    letra: "N",
    titulo: "ISO 14001:2015 — El Sistema de Gestión Ambiental Logístico",
    contexto: "TransCargo Panamá S.A. desea certificarse bajo ISO 14001:2015. El equipo de calidad ha identificado que sus procesos más críticos son: transporte terrestre (flota de 40 camiones), almacenamiento refrigerado (2 bodegas frías), y gestión de residuos de embalaje.",
    pregunta1: {
      enunciado: "Explica el ciclo PHVA (Planificar-Hacer-Verificar-Actuar) aplicado al SGA de TransCargo Panamá. Para la etapa de PLANIFICAR, describe al menos DOS elementos concretos que la empresa debe definir.",
      tipo: "abierta",
      respuesta: "PHVA en TransCargo: PLANIFICAR: (1) Identificar los aspectos ambientales significativos de cada proceso (emisiones de la flota, consumo eléctrico de bodegas frías, residuos de embalaje) y evaluar sus riesgos. (2) Establecer objetivos y metas ambientales medibles (ej: reducir emisiones de CO₂ de la flota en 15% en 12 meses). HACER: Implementar los programas de gestión: mantenimiento preventivo de la flota, sensores de temperatura eficientes en bodegas, programa de separación de residuos. VERIFICAR: Auditorías internas del SGA, monitoreo de KPIs ambientales (consumo de combustible/km, kWh por m³ refrigerado, % de residuos reciclados). ACTUAR: Revisar el SGA en revisión por la dirección, aplicar acciones correctivas a no conformidades."
    },
    pregunta2: {
      enunciado: "En ISO 14001:2015, el término 'partes interesadas pertinentes' en el contexto de una empresa logística incluye:",
      opciones: [
        "A) Únicamente los empleados directos de la empresa",
        "B) Solo las autoridades regulatorias como MiAMBIENTE",
        "C) Clientes, comunidades cercanas, proveedores, reguladores y empleados que tienen interés o son afectados",
        "D) Exclusivamente los accionistas y la junta directiva"
      ],
      correcta: "C",
      explicacion: "ISO 14001:2015 amplía el concepto de partes interesadas (stakeholders) a todos los que pueden afectar o ser afectados por el SGA: trabajadores, comunidades aledañas a rutas y bodegas, clientes que exigen proveedores sostenibles, proveedores de combustible y embalaje, y organismos reguladores como MiAMBIENTE."
    }
  },
  {
    id: 7,
    bloque: "NÚCLEO TÉCNICO",
    bloqueColor: "#0D47A1",
    minutos: 8,
    letra: "E",
    titulo: "Huella Hídrica: El Agua Invisible en la Cadena de Suministro",
    contexto: "Una bodega de distribución de alimentos en Panamá consume mensualmente: 800 m³ de agua potable para limpieza de instalaciones y sanitarios, y genera 650 m³ de aguas residuales industriales. El factor de biocapacidad hídrica de Panamá es de 3.8 hag/persona/año.",
    pregunta1: {
      enunciado: "Diferencia los conceptos de Huella Hídrica Azul, Verde y Gris aplicándolos a las operaciones de esta bodega de alimentos. ¿Cuál de los tres componentes genera mayor preocupación ambiental en este caso y por qué?",
      tipo: "abierta",
      respuesta: "Huella Azul: volumen de agua superficial o subterránea consumida (los 800 m³/mes de agua potable). Huella Verde: agua de lluvia evaporada — en una bodega es casi nula salvo áreas verdes del predio. Huella Gris: volumen de agua dulce necesaria para diluir los contaminantes hasta niveles aceptables — los 650 m³ de aguas residuales industriales representan la huella gris más crítica. Mayor preocupación: la Huella Gris, porque si las aguas residuales contienen detergentes, grasas o residuos alimentarios y se vierten sin tratamiento adecuado, contaminan fuentes de agua superficial, afectan ecosistemas acuáticos y violan el Decreto Ejecutivo 35/2015 sobre vertimientos."
    },
    pregunta2: {
      enunciado: "La 'logística inversa verde' en el contexto del agua significa:",
      opciones: [
        "A) Devolver el agua usada al proveedor para su reciclaje",
        "B) Recuperar, tratar y reutilizar aguas residuales dentro del mismo proceso operativo",
        "C) Exportar el agua purificada como producto secundario de la bodega",
        "D) Certificar el agua consumida como huella azul neutral"
      ],
      correcta: "B",
      explicacion: "La logística inversa verde aplicada al agua implica cerrar el ciclo hídrico: recuperar las aguas grises o residuales, tratarlas (filtración, cloración) y reintroducirlas en procesos que no requieran agua potable (limpieza de pisos, descarga de sanitarios, riego de áreas verdes). Esto reduce la Huella Azul y disminuye los vertimientos."
    }
  },

  // ══════════════════════════════════════════════
  // BLOQUE 3: SPRINT FINAL — 3 retos × 5 min
  // ══════════════════════════════════════════════
  {
    id: 8,
    bloque: "SPRINT FINAL",
    bloqueColor: "#B71C1C",
    minutos: 5,
    letra: "D",
    titulo: "KPIs Verdes: Midiendo la Sostenibilidad Logística",
    contexto: "La gerencia de sostenibilidad de FreightGreen S.A. te pide diseñar un tablero de indicadores ambientales para sus operaciones.",
    pregunta1: {
      enunciado: "Propón CUATRO KPIs verdes medibles y específicos para evaluar el desempeño ambiental de una empresa de transporte y distribución. Indica la unidad de medida de cada uno.",
      tipo: "abierta",
      respuesta: "KPI 1: Intensidad de emisiones de CO₂ por tonelada-kilómetro transportada (kg CO₂/t·km). KPI 2: Consumo de combustible por unidad de carga (L/100 km por vehículo). KPI 3: Porcentaje de residuos de embalaje reciclados vs. total generado (%). KPI 4: Consumo eléctrico de bodegas por m² de almacenamiento (kWh/m²/mes). Adicionales válidos: tasa de ocupación de vehículos (%), número de derrames reportados por trimestre, huella hídrica mensual (m³)."
    },
    pregunta2: {
      enunciado: "Un KPI ambiental es EFECTIVO cuando cumple el criterio SMART. ¿Cuál de estos ejemplos cumple mejor ese criterio?",
      opciones: [
        "A) 'Reducir el impacto ambiental de nuestra flota durante el próximo año'",
        "B) 'Disminuir las emisiones de CO₂ de la flota en 12% respecto al año anterior, medido trimestralmente'",
        "C) 'Mejorar la sostenibilidad de las operaciones logísticas en general'",
        "D) 'Hacer que todos los camiones sean más eficientes energéticamente'"
      ],
      correcta: "B",
      explicacion: "La opción B es SMART: Específica (emisiones CO₂ de la flota), Medible (12% de reducción), Alcanzable (meta concreta), Relevante (impacto directo del negocio), y con Tiempo definido (respecto al año anterior, medido trimestralmente). Las demás opciones son vagas y no medibles."
    }
  },
  {
    id: 9,
    bloque: "SPRINT FINAL",
    bloqueColor: "#B71C1C",
    minutos: 5,
    letra: "O",
    titulo: "Logística Verde: Rutas, Modos y Decisiones Sostenibles",
    contexto: "Una empresa debe trasladar 20 toneladas de mercancía desde la Zona Libre de Colón hasta David, Chiriquí. Tiene dos opciones: Opción 1 — Camión de 20 toneladas (diésel): 600 km, factor de emisión 0.09 kg CO₂/t·km. Opción 2 — Ferrocarril hasta Aguadulce + camión liviano hasta David: 480 km tren (0.025 kg CO₂/t·km) + 280 km camión (0.09 kg CO₂/t·km).",
    pregunta1: {
      enunciado: "Calcula las emisiones de CO₂ de cada opción y determina cuál es más sostenible ambientalmente. Muestra el procedimiento completo.",
      tipo: "abierta",
      respuesta: "Opción 1 — Camión directo: 20 t × 600 km × 0.09 kg CO₂/t·km = 1,080 kg CO₂. Opción 2 — Multimodal: Tren: 20 t × 480 km × 0.025 = 240 kg CO₂. Camión: 20 t × 280 km × 0.09 = 504 kg CO₂. Total Opción 2: 744 kg CO₂. Diferencia: 1,080 − 744 = 336 kg CO₂ menos. La Opción 2 multimodal es 31% más sostenible en emisiones. Nota pedagógica: el tren tiene factor de emisión 3.6 veces menor que el camión diésel."
    },
    pregunta2: {
      enunciado: "El concepto de 'última milla verde' en logística urbana se refiere a:",
      opciones: [
        "A) El último kilómetro de autopista antes de llegar a un centro de distribución",
        "B) La entrega final al cliente usando modos de transporte de bajas o cero emisiones",
        "C) La última etapa del ciclo de vida de un producto antes de su disposición final",
        "D) El último tramo del oleoducto de combustible que abastece la flota"
      ],
      correcta: "B",
      explicacion: "La 'última milla verde' (green last mile) es la parte del proceso logístico que lleva el producto desde el centro de distribución urbano hasta el cliente final, usando vehículos eléctricos, bicicletas de carga, transporte a pie o drones, reduciendo emisiones y congestión en zonas urbanas."
    }
  },
  {
    id: 10,
    bloque: "SPRINT FINAL",
    bloqueColor: "#B71C1C",
    minutos: 5,
    letra: "R",
    titulo: "El PIGA: Plan de Gestión Ambiental Integrado",
    contexto: "La empresa LogisPanama S.A. debe elaborar su PIGA (Plan Integrado de Gestión Ambiental) por exigencia de MiAMBIENTE. El plan debe abordar sus tres impactos más críticos: emisiones de GEI por transporte, residuos de embalaje plástico y consumo de agua en sus bodegas.",
    pregunta1: {
      enunciado: "Para UNO de los tres impactos críticos de LogisPanama, diseña un programa de gestión ambiental que incluya: objetivo medible, meta para 12 meses, acciones concretas (mínimo 3) y responsable de cada acción.",
      tipo: "abierta",
      respuesta: "Ejemplo para Emisiones de GEI por transporte — Objetivo: Reducir las emisiones de CO₂ de la flota de camiones en 15% para diciembre 2027. Meta 12 meses: Línea base medida Q1, reducción del 8% al cierre del año. Acción 1: Implementar sistema de telemetría vehicular para monitorear consumo de combustible en tiempo real (Responsable: Jefe de Flota). Acción 2: Programa de conducción eficiente (eco-driving) para todos los conductores (Responsable: RRHH + Gerencia de Flota). Acción 3: Mantenimiento preventivo trimestral de motores y neumáticos (Responsable: Taller Mecánico). Acción 4: Optimización de rutas con software GIS para reducir km muertos (Responsable: Gerencia de Operaciones)."
    },
    pregunta2: {
      enunciado: "¿Qué distingue a un PIGA de una simple lista de buenas prácticas ambientales?",
      opciones: [
        "A) El PIGA es más largo y detallado",
        "B) El PIGA integra objetivos medibles, responsables, plazos y mecanismos de verificación articulados en el SGA",
        "C) El PIGA solo aplica a empresas con más de 100 empleados",
        "D) El PIGA es elaborado exclusivamente por consultores externos certificados"
      ],
      correcta: "B",
      explicacion: "El PIGA es un instrumento de gestión sistémica: no es un listado de intenciones, sino un plan articulado con objetivos SMART, responsables definidos, cronograma, recursos asignados y mecanismos de seguimiento y verificación integrados al SGA (ISO 14001). Esto lo diferencia de una lista de buenas prácticas que carece de estructura de responsabilidad y medición."
    }
  }
];

// ─── Paleta de colores — diseño para móvil, alta legibilidad ───
const COLORS = {
  bg: "#0A1628",
  card: "#112240",
  cardBorder: "#1E3A5F",
  accent: "#00C896",
  accentDark: "#00A076",
  text: "#E8F4F8",
  textMuted: "#8BA7C0",
  gold: "#FFD700",
  correct: "#00E676",
  incorrect: "#FF5252",
  timerWarning: "#FF9800",
  timerDanger: "#F44336",
  bloqueCalentamiento: "#1B5E20",
  bloqueNucleo: "#0D47A1",
  bloqueSprint: "#B71C1C",
};

export default function CodigoVerdeA() {
  const [pantalla, setPantalla] = useState("intro");
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [retoActual, setRetoActual] = useState(0);
  const [respuesta1, setRespuesta1] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [contrasenaArmada, setContrasenaArmada] = useState([]);
  const [timerReto, setTimerReto] = useState(0);
  const [timerGlobal, setTimerGlobal] = useState(90 * 60);
  const [timerActivo, setTimerActivo] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const intervalRef = useRef(null);
  const globalRef = useRef(null);

  const equipos = ["ALFA", "GAMMA", "ÉPSILON"];
  const coloresEquipo = { ALFA: "#00C896", GAMMA: "#4CAF50", "ÉPSILON": "#8BC34A" };

  // Timer por reto
  useEffect(() => {
    if (pantalla === "reto" && timerActivo) {
      intervalRef.current = setInterval(() => {
        setTimerReto(t => {
          if (t <= 1) { clearInterval(intervalRef.current); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [pantalla, timerActivo, retoActual]);

  // Timer global
  useEffect(() => {
    if (timerActivo) {
      globalRef.current = setInterval(() => {
        setTimerGlobal(t => {
          if (t <= 1) { clearInterval(globalRef.current); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(globalRef.current);
  }, [timerActivo]);

  const iniciarReto = (idx) => {
    setRetoActual(idx);
    setTimerReto(RETOS[idx].minutos * 60);
    setRespuesta1("");
    setOpcionSeleccionada(null);
    setMostrarFeedback(false);
    setPantalla("reto");
    if (!timerActivo) setTimerActivo(true);
  };

  const confirmarRespuesta = () => {
    if (!opcionSeleccionada) return;
    const esCorrecta = opcionSeleccionada === RETOS[retoActual].pregunta2.correcta;
    if (esCorrecta) setPuntaje(p => p + 1);
    const letra = RETOS[retoActual].letra;
    setContrasenaArmada(prev => [...prev, { letra, correcta: esCorrecta }]);
    setMostrarFeedback(true);
  };

  const siguienteReto = () => {
    if (retoActual + 1 >= RETOS.length) {
      setPantalla("victoria");
      setTimerActivo(false);
      clearInterval(intervalRef.current);
      clearInterval(globalRef.current);
    } else {
      iniciarReto(retoActual + 1);
    }
  };

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const colorTimer = (s, max) => s < 60 ? COLORS.timerDanger : s < max * 0.3 ? COLORS.timerWarning : COLORS.accent;
  const colorGlobal = timerGlobal < 300 ? COLORS.timerDanger : timerGlobal < 1200 ? COLORS.timerWarning : COLORS.accent;

  const estilosBase = {
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${COLORS.bg} 0%, #0D2137 100%)`,
    color: COLORS.text,
    fontFamily: "'Segoe UI', Arial, sans-serif",
    padding: "12px",
    boxSizing: "border-box",
  };

  // ─── PANTALLA INTRO ───
  if (pantalla === "intro") return (
    <div style={estilosBase}>
      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>🚢</div>
        <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: 4, marginBottom: 4 }}>
          ITSE · EDA1001 · II CUATRIMESTRE 2026
        </div>
        <h1 style={{ fontSize: 28, color: COLORS.accent, margin: "8px 0 4px", fontWeight: 900, letterSpacing: 2 }}>
          OPERACIÓN
        </h1>
        <h1 style={{ fontSize: 36, color: "#FFFFFF", margin: "0 0 8px", fontWeight: 900, letterSpacing: 3 }}>
          CÓDIGO VERDE
        </h1>
        <div style={{ fontSize: 12, color: COLORS.gold, letterSpacing: 2, marginBottom: 20 }}>
          VERSIÓN A · {EQUIPOS_VERSION}
        </div>

        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 16, marginBottom: 20, textAlign: "left" }}>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: COLORS.textMuted, margin: 0 }}>
            ⚠️ Alerta de Nivel Crítico. La cadena de suministro panameña está en riesgo. Un cargamento de datos ambientales clasificados ha sido interceptado. Solo equipos con conocimiento técnico logístico pueden desencriptar el código y neutralizar la amenaza.
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: COLORS.text, margin: "12px 0 0" }}>
            🎯 <strong>Misión:</strong> Completar 10 retos en <strong>90 minutos</strong>. Cada respuesta correcta revela una letra. Ensambla la contraseña de 10 letras y envía el código de evacuación.
          </p>
        </div>

        <div style={{ background: "rgba(0,200,150,0.08)", border: `1px solid ${COLORS.accent}`, borderRadius: 10, padding: 12, marginBottom: 20, fontSize: 12, color: COLORS.textMuted }}>
          <div style={{ color: COLORS.accent, fontWeight: 700, marginBottom: 6 }}>⏱ ESTRUCTURA DE LA MISIÓN</div>
          <div>🟢 Calentamiento: Retos 1–3 · 10 min c/u</div>
          <div>🔵 Núcleo Técnico: Retos 4–7 · 8 min c/u</div>
          <div>🔴 Sprint Final: Retos 8–10 · 5 min c/u</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 10 }}>Selecciona tu equipo:</div>
          {equipos.map(eq => (
            <button key={eq} onClick={() => setEquipoSeleccionado(eq)}
              style={{ display: "block", width: "100%", padding: "14px", marginBottom: 8, borderRadius: 10, border: `2px solid ${equipoSeleccionado === eq ? coloresEquipo[eq] : COLORS.cardBorder}`, background: equipoSeleccionado === eq ? `${coloresEquipo[eq]}22` : COLORS.card, color: equipoSeleccionado === eq ? coloresEquipo[eq] : COLORS.text, fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: 2 }}>
              EQUIPO {eq}
            </button>
          ))}
        </div>

        {equipoSeleccionado && (
          <button onClick={() => iniciarReto(0)}
            style={{ width: "100%", padding: "16px", borderRadius: 12, border: "none", background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`, color: "#000", fontSize: 16, fontWeight: 900, cursor: "pointer", letterSpacing: 2, boxShadow: `0 4px 20px ${COLORS.accent}66` }}>
            🚀 INICIAR MISIÓN — EQUIPO {equipoSeleccionado}
          </button>
        )}
      </div>
    </div>
  );

  // ─── PANTALLA RETO ───
  if (pantalla === "reto") {
    const reto = RETOS[retoActual];
    const maxSeg = reto.minutos * 60;
    return (
      <div style={estilosBase}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>

          {/* Header con timers */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 2 }}>EQUIPO</div>
              <div style={{ fontSize: 13, color: coloresEquipo[equipoSeleccionado], fontWeight: 800 }}>{equipoSeleccionado}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 2 }}>RETO</div>
              <div style={{ fontSize: 22, color: colorTimer(timerReto, maxSeg), fontWeight: 900, fontFamily: "monospace" }}>{fmt(timerReto)}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 2 }}>MISIÓN</div>
              <div style={{ fontSize: 13, color: colorGlobal, fontWeight: 800, fontFamily: "monospace" }}>{fmt(timerGlobal)}</div>
            </div>
          </div>

          {/* Progreso contraseña */}
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "8px 12px", marginBottom: 10, display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
            {CONTRASENA.split("").map((letra, i) => {
              const obtenida = contrasenaArmada[i];
              return (
                <div key={i} style={{ width: 28, height: 32, borderRadius: 4, border: `1px solid ${obtenida ? (obtenida.correcta ? COLORS.correct : COLORS.incorrect) : COLORS.cardBorder}`, background: obtenida ? (obtenida.correcta ? "#00E67622" : "#FF525222") : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: obtenida ? (obtenida.correcta ? COLORS.correct : COLORS.incorrect) : COLORS.textMuted, fontFamily: "monospace" }}>
                  {obtenida ? obtenida.letra : "·"}
                </div>
              );
            })}
          </div>

          {/* Bloque y título */}
          <div style={{ background: reto.bloqueColor, borderRadius: "8px 8px 0 0", padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2 }}>{reto.bloque}</span>
            <span style={{ fontSize: 10, fontWeight: 700 }}>RETO {reto.id}/10 · {reto.minutos} MIN</span>
          </div>
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderTop: "none", borderRadius: "0 0 8px 8px", padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.accent, marginBottom: 8 }}>
              🔒 {reto.titulo}
            </div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.6, marginBottom: 10, padding: "8px 10px", background: "rgba(255,255,255,0.04)", borderRadius: 6, borderLeft: `3px solid ${reto.bloqueColor}` }}>
              {reto.contexto}
            </div>

            {/* Pregunta 1 */}
            {!mostrarFeedback && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>▶ PREGUNTA 1 — ANÁLISIS TÉCNICO</div>
                <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6, marginBottom: 8 }}>{reto.pregunta1.enunciado}</div>
                <textarea value={respuesta1} onChange={e => setRespuesta1(e.target.value)}
                  placeholder="Desarrolla tu respuesta aquí..."
                  style={{ width: "100%", minHeight: 80, background: "rgba(255,255,255,0.06)", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6, color: COLORS.text, fontSize: 12, padding: 8, resize: "vertical", boxSizing: "border-box" }} />
              </div>
            )}

            {/* Pregunta 2 */}
            {!mostrarFeedback && (
              <div>
                <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>▶ PREGUNTA 2 — SELECCIÓN MÚLTIPLE · 🔑 LETRA {reto.letra}</div>
                <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6, marginBottom: 10 }}>{reto.pregunta2.enunciado}</div>
                {reto.pregunta2.opciones.map((op, i) => {
                  const letra = op[0];
                  return (
                    <button key={i} onClick={() => setOpcionSeleccionada(letra)}
                      style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", marginBottom: 6, borderRadius: 8, border: `1px solid ${opcionSeleccionada === letra ? COLORS.accent : COLORS.cardBorder}`, background: opcionSeleccionada === letra ? `${COLORS.accent}22` : "rgba(255,255,255,0.03)", color: opcionSeleccionada === letra ? COLORS.accent : COLORS.text, fontSize: 12, cursor: "pointer", lineHeight: 1.5 }}>
                      {op}
                    </button>
                  );
                })}
                <button onClick={confirmarRespuesta} disabled={!opcionSeleccionada}
                  style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: opcionSeleccionada ? `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})` : COLORS.cardBorder, color: opcionSeleccionada ? "#000" : COLORS.textMuted, fontSize: 13, fontWeight: 700, cursor: opcionSeleccionada ? "pointer" : "default", marginTop: 4 }}>
                  CONFIRMAR RESPUESTA
                </button>
              </div>
            )}

            {/* Feedback */}
            {mostrarFeedback && (
              <div>
                <div style={{ background: opcionSeleccionada === reto.pregunta2.correcta ? "#00E67618" : "#FF525218", border: `1px solid ${opcionSeleccionada === reto.pregunta2.correcta ? COLORS.correct : COLORS.incorrect}`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: opcionSeleccionada === reto.pregunta2.correcta ? COLORS.correct : COLORS.incorrect, marginBottom: 4 }}>
                    {opcionSeleccionada === reto.pregunta2.correcta ? "✅ ¡CORRECTO!" : "❌ INCORRECTO"}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.6, marginBottom: 8 }}>
                    <strong>Respuesta correcta: {reto.pregunta2.correcta}</strong>
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, lineHeight: 1.6, fontStyle: "italic" }}>
                    {reto.pregunta2.explicacion}
                  </div>
                </div>
                <div style={{ background: "rgba(0,200,150,0.06)", border: `1px solid ${COLORS.accent}44`, borderRadius: 8, padding: 10, marginBottom: 10 }}>
                  <div style={{ fontSize: 10, color: COLORS.accent, fontWeight: 700, marginBottom: 4 }}>💡 RESPUESTA DE REFERENCIA — PREGUNTA 1</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, lineHeight: 1.6 }}>{reto.pregunta1.respuesta}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ fontSize: 13, color: COLORS.textMuted }}>Letra desbloqueada:</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: opcionSeleccionada === reto.pregunta2.correcta ? COLORS.correct : COLORS.incorrect, fontFamily: "monospace" }}>{reto.letra}</div>
                </div>
                <button onClick={siguienteReto}
                  style={{ width: "100%", padding: "14px", borderRadius: 8, border: "none", background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`, color: "#000", fontSize: 14, fontWeight: 900, cursor: "pointer" }}>
                  {retoActual + 1 >= RETOS.length ? "🏁 FINALIZAR MISIÓN" : `SIGUIENTE RETO → ${retoActual + 2}/10`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── PANTALLA VICTORIA ───
  if (pantalla === "victoria") {
    const correctas = contrasenaArmada.filter(c => c.correcta).length;
    const contrasenaFinal = contrasenaArmada.map(c => c.letra).join("");
    return (
      <div style={{ ...estilosBase, textAlign: "center" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ fontSize: 64, marginBottom: 8 }}>🏆</div>
          <h1 style={{ fontSize: 26, color: COLORS.accent, fontWeight: 900, marginBottom: 4 }}>¡MISIÓN COMPLETADA!</h1>
          <div style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 20 }}>EQUIPO {equipoSeleccionado} · VERSIÓN A</div>

          <div style={{ background: COLORS.card, border: `2px solid ${COLORS.accent}`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: 2, marginBottom: 8 }}>CONTRASEÑA ENSAMBLADA</div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
              {contrasenaArmada.map((c, i) => (
                <div key={i} style={{ width: 32, height: 36, borderRadius: 4, border: `2px solid ${c.correcta ? COLORS.correct : COLORS.incorrect}`, background: c.correcta ? "#00E67622" : "#FF525222", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: c.correcta ? COLORS.correct : COLORS.incorrect, fontFamily: "monospace" }}>{c.letra}</div>
              ))}
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.gold, letterSpacing: 4, fontFamily: "monospace" }}>{contrasenaFinal}</div>
          </div>

          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.accent }}>{correctas}/10</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>Respuestas correctas en selección múltiple</div>
          </div>

          <a href="https://teams.microsoft.com" target="_blank" rel="noopener noreferrer"
            style={{ display: "block", width: "100%", padding: "14px", borderRadius: 10, border: "none", background: "linear-gradient(90deg, #6264A7, #8B8CC7)", color: "#FFF", fontSize: 14, fontWeight: 700, cursor: "pointer", textDecoration: "none", boxSizing: "border-box", marginBottom: 8 }}>
            📤 ENVIAR CÓDIGO POR MICROSOFT TEAMS
          </a>

          <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 12, lineHeight: 1.6 }}>
            Informa a la Directora Operativa: Equipo {equipoSeleccionado} · Contraseña: <strong>{contrasenaFinal}</strong> · Puntaje: {correctas}/10
          </div>
        </div>
      </div>
    );
  }

  return null;
}
