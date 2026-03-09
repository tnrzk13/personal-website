<script>
  import { onMount } from "svelte";
  let { texts = [], delay = 60, word_complete_delay = 1000, num_loops = 1, repeat_n_words = 0, blink_time = 1000, blinker_iter_count = "infinite" } = $props();

  let state = $state("");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let localTexts = texts.map(t => ({ word: t, direction: "type&delete" }));

  const showFinalText = () => {
    const lastWord = repeat_n_words > 0
      ? texts[repeat_n_words - 1]
      : texts[texts.length - 1];
    state = lastWord;
  };

  const createRepeatArray = () => {
    localTexts = localTexts.slice(0, repeat_n_words);
    localTexts[localTexts.length - 1].direction = "type";
  };

  const animateType = () => {
    let typing_delay = 100;

    for (let loop = 0; loop < num_loops; loop++) {
      if (num_loops != 1 && repeat_n_words != 0 && loop === num_loops - 1) {
        createRepeatArray();
      }

      localTexts.forEach(({ direction, word }) => {
        for (let i = 0; i < word.length; i++) {
          setTimeout(() => {
            state = state + word[i];
          }, typing_delay);
          typing_delay = typing_delay + delay;
        }
        if (direction === "type&delete") {
          for (let i = 0; i < word.length; i++) {
            if (i === 0) {
              setTimeout(() => {
                state = state.slice(0, -1);
              }, typing_delay + word_complete_delay);
              typing_delay = typing_delay + delay + word_complete_delay;
            } else {
              setTimeout(() => {
                state = state.slice(0, -1);
              }, typing_delay);
              typing_delay = typing_delay + delay;
            }
          }
        }
      });
    }
  };

  onMount(() => {
    if (prefersReducedMotion) {
      showFinalText();
    } else {
      animateType();
    }
  });
</script>

<span class="typing-animated"
  >{state}<span
    class="blinker"
    style="animation-duration: {blink_time}ms; animation-iteration-count: {blinker_iter_count}"
    >|</span
  ></span
>

<style>
  .blinker {
    animation: blinking;
    opacity: 0;
  }
  @keyframes blinking {
    0% {
      opacity: 0;
    }
    49% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
</style>
