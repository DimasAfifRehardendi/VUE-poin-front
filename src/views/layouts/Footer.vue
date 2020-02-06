<template>
  <footer
    class="footer"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <div style="text-align:center" class="copyright">
        &copy; {{ year }}, Designed by
        XI RPL 2
        <br>
        18
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
