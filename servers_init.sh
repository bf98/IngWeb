#!/bin/bash

tmux new-window -n 'servers'
tmux split-window -v
tmux send-keys -t 0 "cd backend && npm run dev" C-m
tmux send-keys -t 1 "cd frontend && npm run dev" C-m


