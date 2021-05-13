/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import { getDatesDifference } from './date&time';

const structuresData = {
    Pronombre: { color: 'rgba(248, 196, 113, 0.8)', title: 'Pronombre'},
    Sustantivo: { color: 'rgba(240, 178, 122, 0.8)', title: 'Sustantivo' },
    Adjetivo: { color: 'rgba(127, 179, 213, 0.8)', title: 'Adjetivo' },
    Verbo: { color: 'rgba(115, 198, 182, 0.8)', title: 'Verbo' },
    Artículo: { color: 'rgba(241, 148, 138, 0.8)', title: 'Artículo' },
    Conjunción: { color: 'rgba(247, 220, 111, 0.8)', title: 'Conjunción' },
    Preposición: { color: 'rgba(39, 174, 96, 0.8)', title: 'Preposición' },
};

/** Funciones públicas */

/** Construir data para stackbar de palabras */
export const buildWordHitsData = (data, kind, color) => {
    /** Obtener sólo los registros pertenecientes al tipo correcto */
    const feeds = Object.values(data);
    let records = [];
    feeds.forEach(feed => {
        if (feed.kind === kind) 
            records.push(feed);
    });

    /** Construir los labels a partir de las palabras */
    let labels = [];
    records.forEach(record => {
        if (!labels.includes(record.word)) 
            labels.push(record.word);
    });

    /** Construir porcentajes de aciertos y desaciertos por cada palabra */
    let hits = [];
    let misses = [];
    labels.forEach((label, i) => {
        let wordTotal = 0;
        let hitTotal = 0;
        records.forEach(record => {
            if (record.word === label) {
                /** Contar el número de aciertos */
                if (record.checked) hitTotal += 1;
                wordTotal += 1;
            }            
        });

        /** Cálculo de porcentajes */
        const hitsPercentage = Math.floor((hitTotal * 100) / wordTotal);
        const missesPercentage = 100 - hitsPercentage;

        /** Agregar los porcentajes a sus respectivos arrays */
        hits.push(hitsPercentage);
        misses.push(missesPercentage);
        labels[i] = `${label}(${wordTotal})`;
    });

    /** retornar chartData */
    return {
        labels,
        datasets: [{
            label: 'Aciertos',
            data: hits,
            backgroundColor: color
        }, {
            label: 'Desaciertos',
            data: misses,
            backgroundColor: 'rgba(229, 231, 233, 0.7)'
        }]
    };
}

/** Construir data para linebar de palabras */
export const buildMatchErrorsData = (data, word) => {
    /** Obtener los registros del tipo correcto */
    const matches = Object.values(data);
    let records = [];
    matches.forEach(match => {
        if (match.variable === word)
            records.push(match);
    });

    /** Construir data */
    let labels = []; /** Apariciones de la variable */
    let occurrence = 1;
    let attempts = [];
    let errors = 0;
    records.forEach(record => {
        /** Verificar si el registro actual fue un match correcto */
        if (record.is_good) {
            /** Si es correcto (orden del siguiente código):
              * a. Guardar una ocurrencia.
              * b. Guardar los errores por intento.
              * c. Sumar la ocurrencia para la siguiente verificación.
              * d. Resetear los errores.
              */
            labels.push(occurrence);
            attempts.push(errors);

            occurrence += 1;
            if (errors > 0) errors = 0;
        }
        else
            /** Contar el error para la misma ocurrencia */
            errors += 1;
    });

    /** Retornar chartData */
    return {
        labels,
        datasets: [{
            label: 'Curva de errores',
            data: attempts,
            backgroundColor: 'rgba(241, 148, 138, 0.5)',
            borderColor: 'rgba(241, 148, 138, 1.0)'
        }]
    };
}

/** */
export const buildPhrasesSummary = (groupedPhrases) => {
    /** Contar el porcetaje de frases 100% correctas */
    let hits = 0;
    groupedPhrases.forEach(phrase => {
        if (phrase.percentage === 100)
            hits += 1;
    });

    /** Calcular porcentajes */
    const totalPhrases = groupedPhrases.length;
    const hitsPercentage = Math.floor((hits * 100) / totalPhrases);
    const errorPencetage = 100 - hitsPercentage;

    /** Retornar chartData */
    return {
        chartData: {
            labels: [ 'Correctas', 'Incorrectas' ],
            datasets: [{
                label: '',
                data: [ hitsPercentage, errorPencetage ],
                backgroundColor: [
                    '#73C6B6',
                    '#E5E7E9'
                ]
            }]
        },
        hits,
        total: totalPhrases
    };
}

/** Construir los datos de los tiempos a partir de las sesiones */
export const buildTimes = (data) => {
    const sessions = Object.values(data);

    let labels = [];
    let minutes = [];
    sessions.forEach(session => {
        /** Obtener la diferencia de tiempos en minutos */
        const diff = getDatesDifference(session.date_start, session.date_end);

        minutes.push(Math.round(diff.minutes));
        labels.push(`ID ${session.id}`);
    });

    /** Retornar chartData */
    return {
        labels,
        datasets: [{
            label: 'Curva de tiempo',
            data: minutes,
            backgroundColor: 'rgba(241, 148, 138, 0.5)',
            borderColor: 'rgba(241, 148, 138, 1.0)'
        }]
    };
}

/** Obtener estructuras trabajadas */
export const getStructures = (phrasesData) => {
    const phrases = Object.values(phrasesData);

    /** Construir el objeto de estructuras */
    let structures = {};
    phrases.forEach(phrase => {
        /** Incluir el tipo de estructura siempre y cuando no
          * esté presente en el array
          */
        const keys = Object.keys(structures);
        const { kind } = phrase;
        if (!keys.includes(kind))
            structures[kind] = structuresData[kind];
    });

    /** Retornar como un array */
    return Object.values(structures);
}

/** Obtener el vocabulario trabajado */
export const getWords = (matchesData) => {
    const matches = Object.values(matchesData);

    /** Construir el array de palabras */
    let words = [];
    matches.forEach(match => {
        if (!words.includes(match.variable))
            words.push(match.variable);
    });

    return words;
}

/** Agrupar las frases */
export const groupPhrases = (phrasesData) => {
    const phrases = Object.values(phrasesData);

    /** Agrupar frases con su porcentage de palabras correctas */
    let grouped = [];
    if (phrases.length > 0) {
        let lastPhrase = phrases.shift();
        let words = [ lastPhrase ];
        let hits = lastPhrase.checked ? 1 : 0;
        phrases.forEach((phrase, i) => {
            if (phrase.id_phrase === lastPhrase.id_phrase) {
                words.push(phrase);
                /** Contabilizar correctas */
                if (phrase.checked) hits += 1;
                /** Si el phrase es el último, agregar registro al 
                 * array de frases agrupadas
                 */
                if (i === (phrases.length - 1)) {
                    const record = buildRecord(words, hits);
                    grouped.push(record);
                }
            }
            else if (phrase.id_phrase !== lastPhrase.id_phrase) {
                /** Agregar nuevo registro al array de frases agrupadas */
                const record = buildRecord(words, hits);
                grouped.push(record);

                /** Resetear valores */
                lastPhrase = phrase;
                words = [ lastPhrase ];
                hits = lastPhrase.checked ? 1 : 0;
            }
        });
    }

    return grouped;
}

/** Funciones privadas */

/** Construir un registro */
const buildRecord = (words, hits) => {
    /** Calcular el porcentaje de palabras correctas */
    const totalWords = words.length;
    const percentage = Math.floor((hits * 100) / totalWords);
    /** Ordenar el array de words */
    words.sort((a, b) => {
        return a.order_phrase > b.order_phrase ? 1 : -1;
    });

    return { percentage, words };
}