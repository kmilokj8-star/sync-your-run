<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Integrations (Garmin/Strava/Apple Health/Coros) are simulated client-side with localStorage until real OAuth credentials exist — no backend yet.
- The product UI uses a dark performance-dashboard system with neon green, black, white, Archivo Black headings, and Hind body text to support fast athletic data scanning.
- Mobile screens use a compact Garmin-inspired information density with a sticky top bar, bottom navigation, single-row metrics, and condensed integration cards because runners need quick one-handed scanning.
- Shared language, units, privacy, notification, and theme preferences live in one reactive provider and persist locally so every route stays consistent.
- Android packaging uses Capacitor around the web build so mobile and web remain one product rather than diverging implementations.
- Public landing visual modules and styles stay isolated from internal app screens so website redesigns cannot change the athlete experience.
- Public app links derive from Vite BASE_URL so they remain valid on root hosting and GitHub Pages subpath hosting.
