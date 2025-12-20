const questions = [
  "Який спогад із дитинства завжди змушує тебе усміхатися?",
  "Яка подія з минулого найбільше вплинула на тебе?",
  "Що було твоєю найбільшою дитячою мрією?",
  "Яка пісня повертає тебе в певний момент?",
  "Яку пораду ти б дав собі десятирічному?",
  "Хто був твоїм кумиром у підлітковому віці?",
  "Яка сімейна традиція тобі подобалася найбільше?",
  "Яка твоя найсмішніша історія з навчання?",
  "Яке досягнення ти вважаєш найважливішим?",
  "Чого тобі найбільше не вистачає з дитинства?",
  "Яка риса твого характеру подобається тобі найбільше?",
  "Що для тебе означає «ідеальний день»?",
  "За що ти найбільше вдячний життю сьогодні?",
  "Яку суперсилу ти б обрав?",
  "Яка книга чи фільм змінили твій світогляд?",
  "Що тебе найбільше надихає в людях?",
  "Якби ти міг змінити одну річ у світі, що б це було?",
  "Що допомагає тобі заспокоїтися?",
  "На що б ти витратив виграний мільйон?",
  "Який твій головний мотивуючий принцип?",
  "Яке було твоє перше враження про мене?",
  "Який момент у наших стосунках найромантичніший?",
  "Що є нашою найбільшою спільною силою?",
  "Яку рису мого характеру ти цінуєш понад усе?",
  "Куди б ти хотів поїхати зі мною у подорож?",
  "Яка спільна звичка приносить тобі найбільше радості?",
  "Як я можу краще підтримати тебе у стресі?",
  "Що ми робимо разом і ти не хочеш припиняти?",
  "Яке наше спільне досягнення найважливіше?",
  "Яку справу ти хотів би спробувати зі мною?",
  "Де ти бачиш нас через 5 років?",
  "Яку навичку ти завжди хотів опанувати?",
  "Яке місце на планеті ти мрієш відвідати разом?",
  "Ким би ти став без фінансових ризиків?",
  "Як виглядає твій дім мрії?",
  "Що ти хочеш встигнути зробити до кінця року?",
  "У якій країні ти б хотів прожити рік?",
  "Який досвід ти хочеш пережити зі мною вперше?",
  "Про що ти мрієш, коли не можеш заснути?",
  "Як би ти назвав останній розділ твоєї автобіографії?",
  "Що для тебе означає справжнє щастя?",
  "З якою історичною постаттю ти б поспілкувався?",
  "Кохання — це вибір чи почуття?",
  "Яка річ у світі здається тобі найбільш дивовижною?",
  "Яку відповідь про майбутнє ти б хотів знати?",
  "Дім — це місце чи люди?",
  "Який момент життя ти б поставив на паузу?",
  "У чому твій головний талант?",
  "Які три речі ти б залишив у житті назавжди?",
  "Що б ти хотів, щоб люди про тебе пам'ятали?",
];

const container = document.getElementById("stack-container");
const emptyState = document.getElementById("empty-state");

function init() {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  shuffled.forEach((text) => {
    const card = createCard(text);
    container.appendChild(card);
  });
}

function createCard(text) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<p>${text}</p>`;

  let startX = 0;
  let currentX = 0;

  const startDrag = (e) => {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    card.style.transition = "none";

    const moveDrag = (me) => {
      currentX = (me.touches ? me.touches[0].clientX : me.clientX) - startX;
      card.style.transform = `translateX(${currentX}px) rotate(${
        currentX / 15
      }deg)`;
    };

    const endDrag = () => {
      card.style.transition = "all 0.5s ease";
      if (Math.abs(currentX) > 140) {
        const side = currentX > 0 ? 1000 : -1000;
        card.style.transform = `translateX(${side}px) rotate(${side / 10}deg)`;
        card.style.opacity = "0";
        setTimeout(() => {
          card.remove();
          if (container.children.length === 0)
            emptyState.classList.remove("hidden");
        }, 400);
      } else {
        card.style.transform = "translateX(0) rotate(0)";
      }
      document.removeEventListener("mousemove", moveDrag);
      document.removeEventListener("touchmove", moveDrag);
    };

    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("touchmove", moveDrag);
    document.addEventListener("mouseup", endDrag, { once: true });
    document.addEventListener("touchend", endDrag, { once: true });
  };

  card.addEventListener("mousedown", startDrag);
  card.addEventListener("touchstart", startDrag);
  return card;
}

init();
