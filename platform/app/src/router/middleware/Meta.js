
export default {
  async metaMeddleware(to) {
    const {meta: { name }} = to

    const pageTitle = name
    const titleName = name ? `${pageTitle}` : "AP Pro Tools"
    const [title] = document.getElementsByTagName('title')
    title.innerHTML = titleName

    


  }
}
