#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WebInfraStack } from '../lib/web-infra-stack';

const app = new cdk.App();
new WebInfraStack(app, 'WebInfraStack');
