<div class="wrapper">
  <div class="container">
    <div class="color" />
    <div class="color" />
    <div class="color" />
    <div class="color" />
    <div class="white" />
  </div>
</div>

<style lang="scss">
  .wrapper {
    // height: 20em;
    // width: 20em;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .container div {
    position: absolute;
    border-radius: 50%;
    animation: aurora 4s infinite;
  }
  @keyframes aurora {
    70% {
      transform: scale(1.2) translate(50px);
    }
  }

  .container {
    filter: blur(8em);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    position: relative;
  }

  .container div:nth-child(1) {
    height: 90%;
    width: 80%;
    background-color: #f3459a;
    left: -20%;
    top: -10%;
  }

  .container div:nth-child(2) {
    height: 80%;
    width: 70%;
    background-color: #ffff00;
    top: -12%;
    right: -12%;
    animation-delay: 2s;
  }

  .container div:nth-child(3) {
    height: 65%;
    width: 80%;
    background-color: #00a8b0;
    bottom: -15%;
    right: -20%;
    animation-delay: 0.3s;
  }

  .container div:nth-child(4) {
    height: 50%;
    width: 75%;
    background-color: #0c75e6;
    bottom: -10%;
    left: -18%;
    animation-delay: 1.2s;
  }

  .container .white {
    height: 50%;
    width: 50%;
    background-color: white;
    top: 25%;
    left: 25%;
    animation: aurora-white 4s infinite;
  }

  @keyframes aurora-white {
    70% {
      transform: scale(1.2);
    }
  }
</style>
