# Tetris Game

這是一個使用 **React + Vite + TypeScript** 打造的網頁版俄羅斯方塊專案，
可直接在 Vercel 部署，並支援桌機與手機操作。

## 專案名稱

Tetris Game

## 專案簡介

本專案是一個可遊玩、可操作、可部署的網頁小遊戲，核心遊戲邏輯使用
TypeScript 撰寫，UI 以 React 元件化方式實作，並遵循現代、簡潔、可回應式調整的設計。

## 功能特色

- 10 x 20 的標準棋盤
- 7 種標準俄羅斯方塊（I、O、T、S、Z、J、L）
- 方塊自動下落
- 左右移動、旋轉、加速下降、直接落底
- 每次下落後自動碰撞與落地
- 消除滿行與更新棋盤
- 分數與等級機制
- 等級提升自動加快下落速度，最低速度不低於 100ms
- 顯示下一個方塊預覽
- 暫停 / 繼續
- 重新開始
- 遊戲結束彈窗
- 鍵盤操作（← → ↑ ↓、Space、P、R）
- 手機操作按鈕（左移、右移、旋轉、下降、直接落下、暫停/繼續、重新開始）

## 使用技術

- React 18
- Vite
- TypeScript
- CSS
- 無後端、無資料庫、無遊戲引擎

## 安裝方式

```bash
cd tetris-game
npm install
```

## 本機啟動方式

```bash
npm run dev
```

啟動後開啟終端機輸出的本機網址，例如 `http://localhost:5173`。

## 建置方式

```bash
npm run build
```

## Vercel 部署方式

1. 到 Vercel 匯入 GitHub 專案
2. Framework Preset 選擇 `Vite`
3. Build Command 填 `npm run build`
4. Output Directory 填 `dist`
5. Install Command 填 `npm install`
6. 點擊 Deploy 即可部署

## 操作說明

### 鍵盤

- `←`：向左移動
- `→`：向右移動
- `↑`：旋轉
- `↓`：加速下降
- `Space`：直接落到最底部
- `P`：暫停 / 繼續
- `R`：重新開始

### 分數規則

- 消除 1 行：100 分
- 消除 2 行：300 分
- 消除 3 行：500 分
- 消除 4 行：800 分

### 等級規則

- 每消除 10 行提升 1 級
- 等級越高，方塊下落越快
- 最低下落間隔不會低於 `100ms`

## GitHub 上傳指令

```bash
cd tetris-game
git init
git add .
git commit -m "Initial commit: create tetris game"
git branch -M main
git remote add origin https://github.com/我的帳號/tetris-game.git
git push -u origin main
```

請把 `我的帳號` 改成你自己的 GitHub 帳號。

## 後續可擴充功能

- 加入音效與背景音樂
- 加入暫存排行榜（LocalStorage）
- 加入方塊預視線預測落點
- 加入連線多人競賽模式
- 新增主題色彩切換（深色/更亮/復古）
