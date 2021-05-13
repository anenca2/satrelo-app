/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

export let featuresData = {
    therapist: {
        role: 'terapeuta',
        features: [
            {
                description: `Configura y genera actividades personalizadas
                                de acuerdo a las necesidades del paciente`,
                id: 1,
                logo: '/images/landing/settings.png',
                title: 'Configura actividades',
                type: 'feature'
            },
            {
                description: `Asigna las actividades generadas al paciente 
                                correspondiente`,
                id: 2,
                logo: '/images/landing/user.png',
                title: 'Asígnalas al paciente',
                type: 'feature'
            },
            {
                description: `Recibe retroalimentación del progreso del paciente
                                en las actividades`,
                id: 3,
                logo: '/images/landing/feedback.png',
                title: 'Recibe retroalimentación',
                type: 'feature'
            }
        ]
    },
    patient: {
        role: 'paciente',
        features: [
            {
                description: `Realiza las actividades asignadas por el
                                terapeuta`,
                id: 1,
                logo: '/images/landing/game.png',
                title: 'Juega las actividades',
                type: 'feature'
            },
            {
                description: `Gana puntos a medida que completas las
                                actividades asignadas`,
                id: 2,
                logo: '/images/landing/score.png',
                title: 'Acumula puntos',
                type: 'feature'
            },
            {
                description: `Intercambia los puntos en la tienda por
                                coleccionables`,
                id: 3,
                logo: '/images/landing/collection.png',
                title: 'Completa la colección',
                type: 'feature'
            }
        ]
    }
}