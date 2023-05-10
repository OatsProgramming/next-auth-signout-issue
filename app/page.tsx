export default function Home() {
  return (
    <main>
      <h1>Home Page.</h1>
      <p>Sign in here then log out here ✅</p>
      <p>Sign in here then try signing out at /anotherPage ❌</p>
      <p>Sign in here then try signing out at /anotherPage then try signing out here ❌</p>
      <p>Fail to sign out but <b>sign in again</b> then sign out from here ✅</p>
    </main>
  )
}
