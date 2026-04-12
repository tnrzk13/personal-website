<script lang="ts">
  import { onMount } from "svelte";
  let { texts = [], delay = 60, word_complete_delay = 1000, num_loops = 1, repeat_n_words = 0, blink_time = 1000, blinker_iter_count = "infinite" } = $props();

  let state = $state("");
  let timeoutId: ReturnType<typeof setTimeout>;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let localTexts = [];

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
    let loopCount = 0;
    let isFirstChar = true;

    const typeChar = (wordIdx, charIdx) => {
      const { word, direction } = localTexts[wordIdx];
      timeoutId = setTimeout(() => {
        isFirstChar = false;
        state += word[charIdx];
        if (charIdx + 1 < word.length) {
          typeChar(wordIdx, charIdx + 1);
        } else if (direction === "type&delete") {
          deleteChar(wordIdx, word.length, true);
        } else {
          advanceWord(wordIdx + 1);
        }
      }, isFirstChar ? 100 : delay);
    };

    const deleteChar = (wordIdx, remaining, pauseFirst = false) => {
      timeoutId = setTimeout(() => {
        state = state.slice(0, -1);
        if (remaining > 1) {
          deleteChar(wordIdx, remaining - 1);
        } else {
          advanceWord(wordIdx + 1);
        }
      }, pauseFirst ? word_complete_delay + delay : delay);
    };

    const advanceWord = (wordIdx) => {
      if (wordIdx < localTexts.length) {
        typeChar(wordIdx, 0);
        return;
      }
      loopCount++;
      if (loopCount >= num_loops) return;
      if (loopCount === num_loops - 1 && num_loops !== 1 && repeat_n_words !== 0) {
        createRepeatArray();
      }
      typeChar(0, 0);
    };

    typeChar(0, 0);
  };

  onMount(() => {
    localTexts = texts.map(t => ({ word: t, direction: "type&delete" }));
    if (prefersReducedMotion) {
      showFinalText();
    } else {
      animateType();
    }
    return () => clearTimeout(timeoutId);
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
