import Layout from "@/ldavis/componentes/Layout";
import Time from "@/ldavis/componentes/Time";
import React from "react";

export default function Resultado(){
    return (
        <div>
            <Layout pagina={"Votacion"}>
                <Time time={60*60}/>
                <div>Pagina para que el administrador vea los resultados</div>
            </Layout>
        </div>
    );
}