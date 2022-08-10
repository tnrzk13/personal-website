<script>
  export let texts;
  import AnimateType from "./AnimateType.svelte";

  class TypeText {
    constructor(word, direction) {
      Object.assign(this, { word, direction });
    }
  }

  let typeTexts = [];
  texts.forEach((element) => {
    typeTexts.push(new TypeText(element + ".", "type&delete"));
  });
</script>

<AnimateType
  texts={typeTexts}
  delay={100}
  num_loops={2}
  repeat_n_words={1}
  blinker_iter_count={9}
/>
