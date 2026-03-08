<script>
  let { texts, delay, num_loops, repeat_n_words, blinker_iter_count } = $props();
  import AnimateType from "./AnimateType.svelte";

  let processedTexts = texts.map((element) => ({ word: element, direction: "type&delete" }));
</script>

<AnimateType
  texts={processedTexts}
  {delay}
  {num_loops}
  {repeat_n_words}
  {blinker_iter_count}
/>
