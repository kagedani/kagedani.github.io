## Context

A retail bank ran a data science platform for more than a hundred data scientists: Kubernetes, JupyterHub, MLflow, GitLab and ELK, on its own hardware. Notebooks, scheduled jobs, models, and the environment they all lived in.

The platform worked. What nobody on the project had was the recipe. It had been installed years earlier and nothing about how had been written down. No runbook, no record of why any component was configured the way it was.

## The problem

An undocumented platform is not a platform with a backlog. It is a platform where every change starts with archaeology.

Every ticket and every enhancement opened the same way: work out how the thing had been installed before you could safely touch it. Days of analysis to answer questions a runbook answers in a paragraph. Meanwhile the debt compounded in the open: GitLab four major versions behind, no test environment at all, and traffic inside the platform still unencrypted. HTTPS across the platform got designed because the bank's security team raised it, not because we got to it first.

And the question that mattered most had never been answered in writing: **what does it mean to operate in production without interrupting people's work**, when the work is an interactive session that stays alive for days? A data scientist does not restart a notebook because a node needs patching. With no answer to that question there was no procedure either, only habits.

## The decisions

### Reconstruct the recipe, inside two months

Before anything else, establish how each tool had actually been installed and configured. Not documentation for its own sake: without it no upgrade could be planned and no failure could be diagnosed.

It was timeboxed to two months, because a platform serving a hundred people cannot stand still while three of us read configuration files. The box held, and nothing important was still unexplained when it closed.

### A cluster between the data and the applications: not my call

The bank's guideline was that corporate applications must not reach into the environment where the data lives. So a second environment sits in between and decouples them: its own Kubernetes cluster, its own GitLab, built and run for that purpose.

It is a sound guideline, and it was handed to us rather than chosen. It is also a second platform to keep alive.

> **Trade-off:** isolation between the data and everything that consumes it, paid for with a second environment carrying the same patching, monitoring and upgrade discipline as the first, on the same three people.

### Define what "without interrupting the work" means

The mechanism already existed: label a node and JupyterHub stops spawning pods onto it. What was missing was everything around it: check who is already running there before you act, and isolate a node when it is quiet rather than when it suits you.

That is a small procedural change and it is the most important decision on this page, because it converts a platform you may only touch nervously into one you can maintain on purpose.

> **Trade-off:** reliability for the people using the platform, bought with slower maintenance. Every operation waits for a window instead of taking one, and a four-major-version backlog closes more slowly because of it.

### Central services on open repositories

Data scientists were writing the same functions over and over: anonymising a dataset, and a dozen variations on that theme. I wrote the first services and the skeleton the rest grew from, on repositories anyone on the platform could read, use, and propose changes to. Nine of them by the end.

The contribution model carries as much weight as the services. A shared library only its author may change becomes a bottleneck; one anyone may change without review becomes a liability shortly after.

> **Trade-off:** every service that grew from that skeleton came through my review. That is what a shared codebase costs to keep coherent, and the cost does not shrink as the codebase grows.

### Models as endpoints, on top of MLflow

An enhancement I proposed: an application skeleton that exposes a trained model as an HTTP endpoint. Flask, over MLflow, so a newer model can be promoted and swapped in without downtime.

The framework is not the point. The point is that a model stops being an artefact inside somebody's notebook and becomes something a corporate application can call and get a prediction back from, which is what the decoupling cluster existed to make safe.

> **Trade-off:** a serving layer of our own to keep. In exchange it fits the on-premise constraints exactly, and leans on MLflow for the genuinely hard part: knowing which model is live, and replacing it without anyone noticing.

### Hardening for availability, unprompted

Nobody asked for this one. Users kept arriving and applications kept being deployed, the cluster was on-premise with a finite number of nodes, and some workloads ran at a low Kubernetes QoS class: first to be evicted, and needing to come back somewhere else quickly when they were. Hardening the platform for high availability was our own initiative, taken before the resource problem arrived rather than after it.

## What went wrong

### The outage that was us

Routine maintenance: isolate a node, update what runs on it, put it back. We labelled the node so JupyterHub would not spawn new pods onto it. Two data scientists were already working on that node.

Two tickets came in, one from each of them, both reporting the platform was broken. The platform was fine. The only thing wrong with it was us, and establishing that cost the team the same analysis a real incident would have cost.

The lesson is not about Kubernetes. From where the user sits, an unannounced maintenance is indistinguishable from a fault, and the bill lands on the team that caused it, in exactly the analysis time the work was meant to be saving. Every rule in the third decision above exists because of that day.

## My role

Three people, for a platform with more than a hundred users: myself and one junior engineer at the start, two from a point onwards, and it stayed that way.

The design was mine, all of it. What I built with my own hands: the decoupling environment, its Kubernetes cluster and its GitLab; the first central services and the skeleton every later one grew from; and the code review on all of those. I coordinated and supported the installation of the test environment, and coordinated and supervised every version upgrade on the platform.

What was not mine: the decoupling itself. That arrived as a guideline from the bank.

## Outcome

| | On arrival | 2025 |
|---|---|---|
| Tool versions | behind, GitLab by four majors | all current |
| Central services | none | 9 |
| Applications in production | fewer than 5 | more than 30 |
| Traffic | unencrypted | HTTPS across the platform |
| A ticket | days of analysis | under an hour |

If only one of those could stay, it would be the applications: more than thirty in production, split between batch (scheduled notebooks) and long-running online services. That is the difference between a platform people experiment on and a platform the bank runs on.

The ticket line is the same fact told from the other end. The archaeology stopped, because by then somebody had written down how the platform worked.
