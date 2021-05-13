/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

/** Definición de la clase */
class Speaker {

    /** Constructor */
    constructor() {
        if (Speaker.instance instanceof Speaker)
            return Speaker.instance;

        this.synthesis = window.speechSynthesis;
        this.utterance = null;
        this.utteranceIndex = 0;
        this.voice = null;
        Speaker.instance = this;
    }

    async init(lang) {
        const { voices } = await this.setVoices();   
        voices.forEach(voiceS => {
            if (voiceS.lang === lang) {
                this.voice = voiceS;
            }
        });
    }

    isSpeaking() {
        return this.synthesis.speaking;
    }

    setVoices() {
        return new Promise((resolve) => {
            const timer = setInterval(() => {
                const voices = this.synthesis.getVoices();
                
                if (voices.length !== 0) {
                    resolve({ voices });
                    clearInterval(timer);
                }
            });
        });
    }

    setVolume(volume) {
        // Cancelar el utterance original
        this.synthesis.cancel();
        // Encontrar el espacio anterior
        //const previousSpace = this.utterance.text.lastIndexOf(' ', this.utteranceIndex);
        // Obtener del mensaje original el texto que hace falta por decir
        const remainingMessage = this.utterance.text.slice(this.utteranceIndex);
        // Hacer que el Speaker diga la parte del texto que falta
        this.utterance = null;
        this.speak(remainingMessage, volume);
    }

    speak(message, volume) {
        if (!message)
            return;
        
        this.utterance = new SpeechSynthesisUtterance(message);
        this.utterance.lang = 'es-MX';
        this.utterance.voice = this.voice;
        this.utterance.rate = 1;
        this.utterance.pitch = 1;
        this.utterance.volume = volume;

        this.utterance.onboundary = (e) => {
            if (e.name === 'word') this.utteranceIndex = e.charIndex;
        };

        this.synthesis.speak(this.utterance, () => {
            this.utterance = null;
        });
    }
}

/** Transforma la clase en un singleton */
const SpeakerSingleton = new Speaker();
export default SpeakerSingleton; 