<script lang="ts">
  import "./app.css"
  import { Router, Route } from "svelte-routing"

  import Layout from "./components/shared/Layout.svelte"
  import Page404 from "./routes/404.svelte"
  import Categories from "./routes/Categories.svelte"
  import Home from "./routes/Home.svelte"
  import Products from "./routes/Products.svelte"
  import Profile from "./routes/Profile.svelte"
  import Search from "./routes/Search.svelte"
  import SignIn from "./routes/SignIn.svelte"
  import SignUp from "./routes/SignUp.svelte"
  import Upload from "./routes/Upload.svelte"

  export let url: string = ""
</script>

<div class="min-h-screen">
  <Router {url}>
    <Layout>
      <Route path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/categories" component={Categories} />
      <Route path="/products" component={Products} />
      <Route path="/search" component={Search} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/upload/:collection/:id" component={Upload} />
      <Route path="*" component={Page404} />
    </Layout>
  </Router>
</div>
