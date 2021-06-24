<script>
  /** props */
  export let note;
  //   document.querySelector(note.point)
    console.log(note.point.getBoundingClientRect());
  console.log(111, note,);
  function p(note) {
      return note.point.getBoundingClientRect()
  }
</script>

<style>
  .c-note {
    outline: rgb(187, 181, 181) 2px solid;
    background: rgba(red, green, blue, 0.6);
    padding: 0.3rem 0.4rem;
    position: absolute;
    z-index: 60;
  }
</style>

<div
  class="c-note"
  style="top:{p(note).top+p(note).height/2}px;left:{p(note).left+p(note).width}px;">
  {note.content}
</div>
