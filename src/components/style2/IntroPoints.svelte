<script>
  import Saos from "saos";
  import Icon from "svelte-awesome";
  import {
    bars,
    creditCard,
    balanceScale,
    graduationCap,
    textHeight,
  } from "svelte-awesome/icons";

  let icons = [bars, creditCard, balanceScale, graduationCap];
  let textContent = [
    "Experience across the entire stack",
    "Previous employers have saved $1000's",
    "Blend of creativity and diligence",
    "Computing and Financial Management, UofWaterloo",
  ];
  let content = [];
  for (let i = 0; i < textContent.length; i++) {
    content[i] = [icons[i], textContent[i]];
  }
</script>

<div class="introWrapper">
  <ul>
    {#each content as [icon, text]}
      <li class="introPoint">
        <Saos
          animation={"fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both"}
          animation_out={"slide-out-fwd-center 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"}
          top={250}
          bottom={250}
        >
          <Icon class="icon" style="color:grey" data={icon} scale={4} />
          <p>{text}</p>
        </Saos>
      </li>
    {/each}
  </ul>
</div>

<style>
  .introWrapper {
    display: inline-block;
    justify-content: center;
    padding: 8em 0 4em 0;
    width: 60%;
    font-size: 4vh;
    font-family: "Montserrat", sans-serif;
    /* font-family: "Proxima Nova", Georgia, sans-serif; */
  }
  li.introPoint {
    list-style-type: none;
  }
  li.introPoint:not(:last-child) {
    margin-bottom: 7em;
  }

  @keyframes -global-fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes -global-slide-out-fwd-center {
    0% {
      transform: translateZ(1);
      opacity: 1;
    }
    100% {
      transform: translateZ(600px);
      opacity: 0;
    }
  }
</style>
