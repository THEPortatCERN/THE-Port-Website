<?php

namespace Drupal\projects_page\Controller;

use Drupal\Core\Url;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\projects_page\Service\ProjectAttributesService;
use Drupal\projects_page\Service\ProjectListService;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProjectsListController extends ControllerBase {

  /** @var \Drupal\project_list\Service\ProjectListService */
  protected $projectListService;

  /** @var \Drupal\project_list\Service\ProjectAttributesService */
  protected $projectAttributesService;

  public function __construct(ProjectListService $projectListService, ProjectAttributesService $projectAttributesService) {
    $this->projectListService = $projectListService;
    $this->projectAttributesService = $projectAttributesService;
  }

  public static function create(ContainerInterface $container) {
    return new static($container->get('project_list.list'), $container->get('project_list.attributes'));
  }

  public function page() {
    $page = [];

    // Preload the JSON and include it in the Drupal settings JavaScript object
    $projectsAllRoute = Url::fromRoute('projects_page.projects.all')->toString();

    $preload_json = [
      '#tag' => 'link',
      '#attributes' => [
        'rel' => 'preload',
        'href' => $projectsAllRoute,
        'as' => 'fetch',
        'crossorigin' => '',
      ],
    ];
    $page['#attached']['html_head'][] = [$preload_json, 'preload_json'];
    $page['#attached']['drupalSettings']['projects_page']['endpoint'] = $projectsAllRoute;
    $page['#attached']['drupalSettings']['projects_page']['attributes'] = $this->projectAttributesService->getAttributes();

    $page['#attached']['library'][] = 'projects_page/dist';
    $page['#attached']['library'][] = 'core/drupalSettings';

    $page['#markup'] = '<div id="app"></div>';
    $page['#cache']['max-age'] = 31536000;

    return $page;
  }

  public function all() {
    $data = $this->projectListService->getTeaserData();

    $cacheMetaData = new CacheableMetadata();
    $cacheMetaData->setCacheMaxAge(3600);
    $cacheMetaData->setCacheContexts(['url']);

    $response = new CacheableJsonResponse($data);
    $response->addCacheableDependency($cacheMetaData);
    return $response;
  }

  public function attributes() {
    $data = $this->projectAttributesService->getAttributes();
    return new JsonResponse($data);
  }
}
