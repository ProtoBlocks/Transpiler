const { Protocol, hash, nonce } = require('protoblocks');

protocol ISO_2_Pass_Unilateral_Authentication_Over_CCF [Prover(Secret), Verifier(Secret)] {
  step Challenge [Verifier -> Prover] {
    const Nonce = nonce();
    Prover.send({"Nonce": Nonce});
  }

  step Response [Prover -> Verifier] {
    const Hash = hash(Challenge.Nonce + Verifier.Id + Prover.Input.Secret);
    Verifier.send({"Hash": Hash});
  }
}

ISO_2_Pass_Unilateral_Authentication_Over_CCF.Prover({});
