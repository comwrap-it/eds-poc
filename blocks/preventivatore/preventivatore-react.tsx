import React, { useState, useEffect } from 'react';

interface PreventivatoreProps {
  // Definisci le props che ricevi da EDS
  data?: any;
  onReady?: () => void;
}

const PreventivatoreComponent: React.FC<PreventivatoreProps> = ({ data, onReady }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // I tuoi dati del form
  });

  // Emetti l'evento quando il componente è montato e pronto
  useEffect(() => {
    console.log('Componente React montato, emetto evento...');
    
    const timer = setTimeout(() => {
      try {
        // Emetti l'evento per nascondere lo skeleton
        const event = new CustomEvent('preventivatoreComponentReady', {
          detail: { timestamp: Date.now() }
        });
        window.dispatchEvent(event);
        console.log('Evento preventivatoreComponentReady emesso:', event);
        
        // Chiama anche il callback se fornito
        if (onReady) {
          onReady();
        }
      } catch (error) {
        console.error('Errore nell\'emissione dell\'evento:', error);
        
        // Fallback: chiama solo il callback
        if (onReady) {
          onReady();
        }
      }
    }, 3000); // Piccolo delay per assicurarsi che tutto sia renderizzato
    
    return () => {
      clearTimeout(timer);
    };
  }, [onReady]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  return (
    <div className="preventivatore-react">
      <h2>Preventivatore - Step {step}</h2>
      
      {step === 1 && (
        <div className="step-1">
          <h3>Dati Personali</h3>
          {/* I tuoi form fields */}
          <button onClick={handleNext}>Avanti</button>
        </div>
      )}
      
      {step === 2 && (
        <div className="step-2">
          <h3>Dettagli Preventivo</h3>
          {/* I tuoi form fields */}
          <button onClick={handlePrev}>Indietro</button>
          <button onClick={handleNext}>Avanti</button>
        </div>
      )}
      
      {step === 3 && (
        <div className="step-3">
          <h3>Riepilogo</h3>
          {/* Riepilogo */}
          <button onClick={handlePrev}>Indietro</button>
          <button type="submit">Invia Preventivo</button>
        </div>
      )}
    </div>
  );
};

export default PreventivatoreComponent;