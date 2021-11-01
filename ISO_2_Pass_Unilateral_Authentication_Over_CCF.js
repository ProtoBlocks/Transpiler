const { Protocol, hash, nonce } = require('protoblocks');

const ISO_2_Pass_Unilateral_Authentication_Over_CCF = new Protocol(
  {
    name: 'ISO_2_Pass_Unilateral_Authentication_Over_CCF',
    principals: [
      {name: "Prover", inputs: ["Secret"]},
      {name: "Verifier", inputs: ["Secret"]}
    ],
    steps: [
      {origin: "Verifier", recipients: ["Prover"], name: "Challenge", function: async (Prover, Verifier) => {
        const Nonce = nonce();
        Prover.send({"Nonce": Nonce});
      }},
      {origin: "Prover", recipients: ["Verifier"], name: "Response", function: async (Prover, Verifier) => {
        const Hash = hash(Challenge.Nonce + Verifier.Id + Prover.Input.Secret);
        Verifier.send({"Hash": Hash});
      }}
    ]
  }
);

ISO_2_Pass_Unilateral_Authentication_Over_CCF.Prover({});
