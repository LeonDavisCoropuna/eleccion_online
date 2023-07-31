import Time from "@/ldavis/Componentes/Time";
import Layout from "../Componentes/Layout";

export default function Votacion() {
    return (
        <div>
            <Layout pagina={"Votacion"}>
                <Time time={10} />
                <div>Pagina para que el elector haga un voto</div>
            </Layout>
        </div>
    );
}