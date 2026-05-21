import { CalendarClock, CreditCard, QrCode, UserPlus, Users } from 'lucide-react';
import { members, trainers } from '../data/demo.js';

export function Operations() {
  return (
    <main className="operations-grid">
      <section className="panel span-2">
        <div className="panel-title"><Users size={18} /><h2>Member Management</h2></div>
        <div className="table-shell">
          <table>
            <thead>
              <tr><th>Member</th><th>Goal</th><th>Plan</th><th>Aura</th><th>XP</th></tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.goal}</td>
                  <td>{member.membership}</td>
                  <td>{member.aura}</td>
                  <td>{member.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-title"><UserPlus size={18} /><h2>Quick Add</h2></div>
        <div className="form-grid">
          <input placeholder="Member name" />
          <input placeholder="Email" />
          <input placeholder="Fitness goal" />
          <button><UserPlus size={16} /> Add Member</button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-title"><QrCode size={18} /><h2>Attendance</h2></div>
        <div className="qr-sim">
          <QrCode size={92} />
          <p>QR + Face check-in ready</p>
          <span>Live zone: Strength Deck</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-title"><CalendarClock size={18} /><h2>Trainer Schedules</h2></div>
        <div className="space-y-3">
          {trainers.map((trainer, index) => (
            <div className="list-row" key={trainer.name}>
              <div>
                <p className="font-semibold text-white">{trainer.name}</p>
                <p className="text-xs text-slate-400">{trainer.spec}</p>
              </div>
              <span className="text-cyan">{16 + index}:00</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-title"><CreditCard size={18} /><h2>Billing</h2></div>
        <div className="billing-core">
          <strong>₹12.85L</strong>
          <p>Monthly paid revenue</p>
          <button><CreditCard size={16} /> Generate Invoice</button>
        </div>
      </section>

    </main>
  );
}
