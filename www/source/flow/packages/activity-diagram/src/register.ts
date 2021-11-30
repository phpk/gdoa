import { registerNode } from '@topology/core';
import { activityFinal, activityFinalIconRect, activityFinalTextRect } from './final';
import { fork, forkHAnchors, forkVAnchors, forkIconRect, forkTextRect } from './fork';
import { swimlaneH, swimlaneHIconRect, swimlaneHTextRect } from './swimlaneH';
import { swimlaneV, swimlaneVIconRect, swimlaneVTextRect } from './swimlaneV';

export function register() {
  registerNode('activityFinal', activityFinal, undefined, activityFinalIconRect, activityFinalTextRect);
  registerNode('swimlaneV', swimlaneV, undefined, swimlaneVIconRect, swimlaneVTextRect);
  registerNode('swimlaneH', swimlaneH, undefined, swimlaneHIconRect, swimlaneHTextRect);
  registerNode('forkH', fork, forkHAnchors, forkIconRect, forkTextRect);
  registerNode('forkV', fork, forkVAnchors, forkIconRect, forkTextRect);
}
