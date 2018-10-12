// @ts-check

import kleur from "kleur";

function arrange(ctx) {
  return {
    act: act.bind({
      sut: this.sut,
      desc: this.desc,
      ctx
    })
  };
}

function act(testExecution) {
  return {
    assert: assert.bind({
      result: testExecution.call(this, this.sut, this.ctx),
      ...this
    })
  };
}

async function assert(exp) {
  try {
    await exp(this.result);
    console.log(kleur.green(`(✓) ${this.desc}`));
  } catch (e) {
    console.group(kleur.red(`(x) ${this.desc}`));
    console.log(e);
    console.groupEnd();
  }
}

export function test(sut, desc) {
  return {
    arrange: arrange.bind({
      desc,
      sut
    })
  }
}
