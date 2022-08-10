<script>
  export let texts, delay, num_loops, repeat_n_words, blinker_iter_count;
  import AnimateType from "./AnimateType.svelte";

  class TypeText {
    constructor(word, direction) {
      Object.assign(this, { word, direction });
    }
  }

  let typeTexts = [];
  texts.forEach((element) => {
    typeTexts.push(new TypeText(element, "type&delete"));
  });
  texts = typeTexts;
</script>

<AnimateType
  {texts}
  {delay}
  {num_loops}
  {repeat_n_words}
  {blinker_iter_count}
/>
