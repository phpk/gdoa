/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An enum for the possible types of connections.
 * @author fenichel@google.com (Rachel Fenichel)
 */

'use strict';

goog.provide('Blockly.connectionTypes');

/**
 * Enum for the type of a connection or input.
 * @enum {number}
 */
Blockly.connectionTypes = {
  // A right-facing value input.  E.g. 'set item to' or 'return'.
  INPUT_VALUE: 1,
  // A left-facing value output.  E.g. 'random fraction'.
  OUTPUT_VALUE: 2,
  // A down-facing block stack.  E.g. 'if-do' or 'else'.
  NEXT_STATEMENT: 3,
  // An up-facing block stack.  E.g. 'break out of loop'.
  PREVIOUS_STATEMENT: 4
};
