export default function Page() {
    return (
        <div>
            <h1>Another Page That's Not the Home Page.</h1>
            <p>Sign in here then log out here ✅</p>
            <p>Sign in here then try signing out from home page ❌</p>
            <p>Sign in here then try signing out from home page then try signing out here ❌</p>
            <p>Fail to sign out but <b>sign in again</b> then sign out from here ✅</p>
        </div>
    )
}