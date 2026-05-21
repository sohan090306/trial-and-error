import { BrainCircuit, Dumbbell, ScanFace, Sparkles, Target, Utensils } from 'lucide-react';
import { useMemo, useState } from 'react';

const planLibrary = {
  'Fat Loss': {
    title: 'Fat Loss AI Plan',
    workout: 'Strength training 4 days/week, zone-2 cardio 2 days/week, 8k-10k daily steps, and mobility recovery.',
    calories: 2200,
    macros: '160P . 210C . 65F',
    training: '4 strength days . 2 cardio days . moderate intensity'
  },
  'Muscle Gain': {
    title: 'Muscle Gain AI Plan',
    workout: 'Progressive overload split with compound lifts, hypertrophy accessories, controlled cardio, and recovery tracking.',
    calories: 2850,
    macros: '170P . 340C . 80F',
    training: '5 lifting days . progressive overload . RPE 7-8'
  },
  'Athletic Performance': {
    title: 'Athletic Performance AI Plan',
    workout: 'Power training, sprint intervals, agility drills, strength maintenance, and mobility work.',
    calories: 2600,
    macros: '165P . 300C . 75F',
    training: '4 performance days . speed work . recovery scan'
  }
};

const bodyModels = {
  'Fat Loss': [
    { label: '30 days', weightDelta: -1.8, auraGain: 6 },
    { label: '90 days', weightDelta: -5.4, auraGain: 14 },
    { label: '6 months', weightDelta: -9.5, auraGain: 21 }
  ],
  'Muscle Gain': [
    { label: '30 days', weightDelta: 0.7, auraGain: 5 },
    { label: '90 days', weightDelta: 2.2, auraGain: 12 },
    { label: '6 months', weightDelta: 4.0, auraGain: 19 }
  ],
  'Athletic Performance': [
    { label: '30 days', weightDelta: -0.4, auraGain: 7 },
    { label: '90 days', weightDelta: -1.0, auraGain: 16 },
    { label: '6 months', weightDelta: -1.6, auraGain: 24 }
  ]
};

function numberFromInput(value, fallback) {
  const parsed = Number.parseFloat(String(value).replace(/[^\d.]/g, ''));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function Intelligence() {
  const [goal, setGoal] = useState('Fat Loss');
  const [age, setAge] = useState('22');
  const [weight, setWeight] = useState('76');
  const [generatedPlan, setGeneratedPlan] = useState(planLibrary['Fat Loss']);
  const [generatedFor, setGeneratedFor] = useState({ goal: 'Fat Loss', age: 22, weight: 76 });

  const prediction = useMemo(() => {
    const baseAura = generatedFor.goal === 'Muscle Gain' ? 78 : 71;
    return bodyModels[generatedFor.goal].map((item) => {
      const projectedWeight = Math.max(35, generatedFor.weight + item.weightDelta);
      return {
        label: item.label,
        value: `${projectedWeight.toFixed(1)} kg`,
        body: `Aura score ${baseAura + item.auraGain} . ${item.weightDelta > 0 ? '+' : ''}${item.weightDelta} kg from current`
      };
    });
  }, [generatedFor]);

  const profileLine = useMemo(() => {
    return [
      `Goal: ${generatedFor.goal}`,
      `Age: ${generatedFor.age} years`,
      `Current weight: ${generatedFor.weight} kg`
    ].join(' . ');
  }, [generatedFor]);

  function createPlan() {
    const nextAge = numberFromInput(age, 22);
    const nextWeight = numberFromInput(weight, 76);
    setGeneratedPlan(planLibrary[goal]);
    setGeneratedFor({ goal, age: nextAge, weight: nextWeight });
  }

  return (
    <main className="space-y-6">
      <section className="panel" id="ai-fitness-planner">
        <div className="panel-title"><BrainCircuit size={18} /><h2>AI Fitness Intelligence</h2></div>
        <div className="ai-grid">
          <div className="form-grid">
            <label>
              <span>Fitness Goal</span>
              <select value={goal} onChange={(event) => setGoal(event.target.value)}>
                <option>Fat Loss</option>
                <option>Muscle Gain</option>
                <option>Athletic Performance</option>
              </select>
            </label>
            <label>
              <span>Age</span>
              <input placeholder="Enter age" value={age} onChange={(event) => setAge(event.target.value)} />
            </label>
            <label>
              <span>Body Weight</span>
              <input placeholder="Enter weight in kg" value={weight} onChange={(event) => setWeight(event.target.value)} />
            </label>
            <button type="button" onClick={createPlan}><Sparkles size={16} /> Create AI Plan</button>
          </div>
          <div className="protocol">
            <h3>{generatedPlan.title}</h3>
            <p className="profile-line">{profileLine}</p>
            <p>{generatedPlan.workout}</p>
            <div className="macro-row"><Utensils size={16} /> {generatedPlan.calories} kcal . {generatedPlan.macros}</div>
            <div className="macro-row"><Dumbbell size={16} /> {generatedPlan.training}</div>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <section className="panel" id="smart-mirror-mode">
          <div className="panel-title"><Target size={18} /><h2>Future Body Prediction</h2></div>
          <p className="panel-help">Projected body weight based on the latest AI plan.</p>
          <div className="prediction-grid">
            {prediction.map((item) => (
              <div className="prediction" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-title"><ScanFace size={18} /><h2>Smart Mirror Mode</h2></div>
          <div className="mirror">
            <div className="pose-line one" />
            <div className="pose-line two" />
            <div className="pose-line three" />
            <p>Posture: 94% aligned</p>
            <span>Rep count: 12 . Form correction: knees stable</span>
          </div>
        </section>
      </section>
    </main>
  );
}
