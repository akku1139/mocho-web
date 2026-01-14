export async function onRequest(context) {
  const { request, params } = context;
  
  // 1. URLから末尾のパス名（* の部分）を取得
  // 例: /proxy/gh/main/README.md -> ["main", "README.md"]
  const pathArray = params.path;
  const pathSuffix = pathArray.join('/');

  // 2. 転送先のGitHubのベースURL
  const GITHUB_BASE = "https://github.com/";

  // 3. 新しいURLを構築
  const targetUrl = new URL(pathSuffix, GITHUB_BASE);

  // 4. GitHubへリクエストを飛ばす
  // 元のリクエストのHeadersを引き継ぐ場合は適宜調整してください
  const response = await fetch(targetUrl.toString(), {
    method: request.method,
    headers: request.headers,
  });

  // 5. レスポンスをそのまま返す（必要に応じてCORSヘッダーなどを追加）
  return new Response(response.body, response);
}
