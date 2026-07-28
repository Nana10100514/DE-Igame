"use strict";

/* =========================================================
   UID対応データベース層（登録ページ・ゲーム共通）

   物理カードのUID と ゲームの会社id/社員id の対応表を、
   ブラウザの localStorage に保存・読み出しします。

   保存キー: animalcompany_uidmap_v1
   データ形: {
     version: 1,
     companies: { "<正規化UID>": "<会社id>", ... },
     employees: { "<正規化UID>": "<社員id>", ... }
   }

   ※登録ページとゲームを「同一オリジン」に置くこと（GitHub Pagesなど）で、
     この localStorage が両ページで共有されます。file:// 直開きでは共有されません。
========================================================= */

(function (global) {
  const LS_KEY = "animalcompany_uidmap_v1";
  const VERSION = 1;

  // UID正規化：前後空白除去 → 大文字化 → 区切り(空白 : -)除去
  // 登録ページとゲームで必ず同じ関数を通すことで、表記ゆれによる不一致を防ぐ。
  function normalizeUid(raw) {
    return String(raw == null ? "" : raw)
      .trim()
      .toUpperCase()
      .replace(/[\s:\-]/g, "");
  }

  function emptyDb() {
    return { version: VERSION, companies: {}, employees: {} };
  }

  function sanitize(parsed) {
    if (!parsed || typeof parsed !== "object") return emptyDb();
    return {
      version: parsed.version || VERSION,
      companies:
        parsed.companies && typeof parsed.companies === "object"
          ? { ...parsed.companies }
          : {},
      employees:
        parsed.employees && typeof parsed.employees === "object"
          ? { ...parsed.employees }
          : {}
    };
  }

  function load() {
    try {
      return sanitize(JSON.parse(global.localStorage.getItem(LS_KEY)));
    } catch (e) {
      return emptyDb();
    }
  }

  function save(db) {
    global.localStorage.setItem(LS_KEY, JSON.stringify(sanitize(db)));
  }

  // UID から {kind, id, uid} を引く（未登録なら null）
  function lookup(db, rawUid) {
    const uid = normalizeUid(rawUid);
    if (!uid) return null;
    if (Object.prototype.hasOwnProperty.call(db.companies, uid)) {
      return { kind: "company", id: db.companies[uid], uid };
    }
    if (Object.prototype.hasOwnProperty.call(db.employees, uid)) {
      return { kind: "employee", id: db.employees[uid], uid };
    }
    return null;
  }

  // UID → エンティティ を束縛（1UID→1エンティティ / 1エンティティ→1UID を維持）
  function bind(db, rawUid, kind, id) {
    const uid = normalizeUid(rawUid);
    if (!uid) return { ok: false, reason: "empty_uid" };
    if (kind !== "company" && kind !== "employee") {
      return { ok: false, reason: "bad_kind" };
    }

    // このUIDが別の束縛を持っていれば外す
    const prev = lookup(db, uid);
    delete db.companies[uid];
    delete db.employees[uid];

    // 同じエンティティに別UIDが付いていれば外す（付け替え）
    const table = kind === "company" ? db.companies : db.employees;
    let replacedUid = null;
    for (const u of Object.keys(table)) {
      if (table[u] === id) {
        replacedUid = u;
        delete table[u];
      }
    }

    table[uid] = id;
    return { ok: true, uid, prev, replacedUid };
  }

  function unbindUid(db, rawUid) {
    const uid = normalizeUid(rawUid);
    const had = delete db.companies[uid];
    const had2 = delete db.employees[uid];
    return had || had2;
  }

  function unbindEntity(db, kind, id) {
    const table = kind === "company" ? db.companies : db.employees;
    let removed = null;
    for (const u of Object.keys(table)) {
      if (table[u] === id) {
        removed = u;
        delete table[u];
      }
    }
    return removed;
  }

  // エンティティ(kind,id) に割り当てられているUID（無ければ null）
  function uidForEntity(db, kind, id) {
    const table = kind === "company" ? db.companies : db.employees;
    for (const u of Object.keys(table)) {
      if (table[u] === id) return u;
    }
    return null;
  }

  function counts(db) {
    return {
      companies: Object.keys(db.companies).length,
      employees: Object.keys(db.employees).length
    };
  }

  function exportJson(db) {
    return JSON.stringify(
      { version: VERSION, companies: db.companies, employees: db.employees },
      null,
      2
    );
  }

  function importJson(text) {
    return sanitize(JSON.parse(text));
  }

  // リポジトリ等に置いた seed JSON を取得（localStorageが空のときだけ採用）
  async function loadSeedIfEmpty(url) {
    const db = load();
    if (counts(db).companies || counts(db).employees) return db;
    try {
      const res = await global.fetch(url, { cache: "no-store" });
      if (!res.ok) return db;
      const seed = importJson(await res.text());
      save(seed);
      return seed;
    } catch (e) {
      return db;
    }
  }

  global.CardDB = {
    LS_KEY,
    VERSION,
    normalizeUid,
    emptyDb,
    load,
    save,
    lookup,
    bind,
    unbindUid,
    unbindEntity,
    uidForEntity,
    counts,
    exportJson,
    importJson,
    loadSeedIfEmpty
  };
})(window);
