import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { useAuth } from "@/context/auth";
import Button from "@/components/UI/button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { user, isLogged } = useAuth();

  return (
    <>
      <Head>
        <title>LinkedOut</title>
        <meta
          name="description"
          content="La mise en relation n°1 entre Freelances et Entreprises"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.leftContainer}>
            <h1>Propulsez votre carrière avec LinkedOut.</h1>
            <p>
              Des milliers d&apos;entreprises font confiance à LinkedOut et
              utilisent les services de freelances inscrit sur LinkedOut.{" "}
              {!isLogged && "Testez gratuitement pendant 30 jours."}
            </p>
            <div className={styles.leftButtons}>
              {isLogged ? (
                user.role === "Freelance" ? (
                  <>
                    <Button
                      type="button"
                      title="Voir vos missions"
                      className="primary"
                      onClick={() => router.push("/auth/register")}
                    />
                    <Button type="button" title="Voir votre profil" />
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      title="Voir les Freelances"
                      className="primary"
                      onClick={() => router.push("/freelances")}
                    />
                    <Button
                      type="button"
                      title="Voir vos missions"
                      onClick={() => router.push("/dashboard/missions")}
                    />
                  </>
                )
              ) : (
                <>
                  <Button
                    type="button"
                    title="S'inscrire"
                    className="primary"
                    onClick={() => router.push("/auth/register")}
                  />
                  <Button type="button" title="Voir les tarifs" />
                </>
              )}
            </div>
            <div>
              <p>
                Découvrez la façon dont les entreprises utilisent LinkedOut.
              </p>
              <a href="#">Voir la vidéo</a>
            </div>
            <div>
              <span>
                LinkedOut n&apos;est pas responsable de problèmes rencontrés
                pendant les missions.
              </span>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <img src="/homepage1.jpg" alt="freelance" />
          </div>
        </div>
        <div className={styles.companies}>
          <h2>Ils nous font confiance</h2>
          <div>
            <p>Ces entreprises ont choisi des Freelances sur LinkedOut.</p>
            <p>Et elles ne le regrette pas.</p>
          </div>
          <div className={styles.companiesLogo}>
            <div>
              <img src="/apple.png" />
            </div>
            <div>
              <img src="/microsoft.png" />
            </div>
            <div>
              <img src="/facebook.png" />
            </div>
            <div>
              <img src="/google.png" />
            </div>
            <div>
              <img src="/amazon.png" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
